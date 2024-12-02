import { ApiError } from "../exceptions/api-error"
import prisma from "../prisma/prismaClient"
import { FilmCreate, FilmUpdate } from "../types/films"
import bcrypt from 'bcrypt';

class FilmsService {
    async delete(filmId: number, userId: number) {
        try {
            const deleteResult = prisma.film.delete({
                where: {id: filmId, userId}
            })
            return deleteResult
        } catch (error) {
            throw ApiError.BadRequest('Some error while deleting films', [error]) 
        }
    }
    async update(userId: number, filmId: number, data: FilmUpdate) {
        try {
            const film = await prisma.film.update({
                where: {id: filmId, userId: userId},
                data: {...data}
             })
            return film
        } catch (error) {
            throw ApiError.BadRequest('Some error while updating films', [error]) 
        }
    }
    async getMany(userId: number) {
        try {
            const films = await prisma.film.findMany({
                where: {
                    userId: userId
                }
            })
            return films
        } catch (error) {
            throw ApiError.BadRequest('Some error while getting films', [error]) 
        }

    }
    async getOne(filmId: number, userId: number) {
        try {
            const film = await prisma.film.findFirst({
                where: {
                    id: filmId,
                    userId: userId
                },
                include: {
                    shootingDay: true,
                    finance: true,
                    script: true,
                    actors: true,
                    crew_members: true,
                }
            })

            if(!film) { throw ApiError.BadRequest('Film not found') }
            return film
        } catch (error) {
            throw ApiError.BadRequest('Some error while getting one film', [error])
        }
    }

    async getByTitle(title: string) {
        return await prisma.film.findFirst({where: {title}})
    }

    async getById(id: number) {
        return await prisma.film.findFirst({where: {id}})
    }

    async create(filmData: FilmCreate, userId: number) {
        try {
            const filmExist = await this.getByTitle(filmData.title)
            if(filmExist) throw ApiError.BadRequest('Film is already exist')

            const newFilm = await prisma.film.create({
                data:  {
                    ...filmData,
                    user: {connect: { id: userId }}
                }
            }) 
            return newFilm
        } catch (error) {
            throw ApiError.BadRequest('Some error while creating film', [error])
        }
    }

    async getManyPagination (page: number, pageSize: number) {
        try {
            const films = await prisma.film.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
            })
            return films
        } catch (error) {
            throw ApiError.BadRequest('Some error while getting film by pagination', [error])
        }
    }    

    async getActors (filmId: number) {
        try {
            const filmsWithActors = await prisma.film.findFirst({
                where: { id: filmId },
                include: {
                    actors: true
                }
            });
            
            if (!filmsWithActors) {
                throw new Error(`Film with ID ${filmId} not found.`);
            }
    
            return filmsWithActors.actors; 
        } catch (error) {
            throw ApiError.BadRequest('Some error while getting film with actors', [error]);
        }
    }

    async getCrewMembers(filmId: number) {
        try {
            const filmWithCrew = await prisma.film.findFirst({
                where: { id: filmId },
                include: {
                    crew_members: true,
                }
            });
            
            if (!filmWithCrew) {
                throw new Error(`Film with ID ${filmId} not found.`);
            }
    
            return filmWithCrew.crew_members; 
        } catch (error) {
            throw ApiError.BadRequest('Some error while getting film with crew members', [error]);
        }
    }


    async assignActor (filmId: number, actorId: number) {
        try {
            const filmExists = await prisma.film.findUnique({ where: { id: filmId }, include: {actors: true}});
            if (!filmExists) { throw ApiError.NotFound(`Film with ID ${filmId} not found.`); }

            const actorExists = await prisma.actor.findUnique({ where: { id: actorId }, });
            if (!actorExists) { throw ApiError.NotFound(`Actor with ID ${actorId} not found.`); }

            const isActorAlreadyAssigned = filmExists.actors.some(actor => actor.id === actorId);
            if (isActorAlreadyAssigned) { throw ApiError.BadRequest(`Actor with ID ${actorId} is already assigned to Film with ID ${filmId}.`); }

            const assignedFilm = await prisma.film.update({
                where: {
                    id: filmExists.id
                },
                data: {
                    actors: {
                        connect: {
                            id: actorExists.id
                        }
                    }
                },
                include: {
                    actors: true
                }
            })
            return assignedFilm
        } catch (error) {
            throw error
        }
    }    

    async assignCrewMember (filmId: number, crewMemberId: number) {
        try {
            const filmExists = await prisma.film.findUnique({ where: { id: filmId }, include: {crew_members: true}});
            if (!filmExists) { throw ApiError.NotFound(`Film with ID ${filmId} not found.`); }

            const crewMemberExists = await prisma.crewMember.findUnique({ where: { id: crewMemberId }, });
            if (!crewMemberExists) { throw ApiError.NotFound(`Crew member with ID ${crewMemberId} not found.`); }

            const isCrewMemberAlreadyAssigned = filmExists.crew_members.some(crewMember => crewMember.id === crewMemberId);
            if (isCrewMemberAlreadyAssigned) { throw ApiError.BadRequest(`Crew member with ID ${crewMemberId} is already assigned to Film with ID ${filmId}.`); }

            const assignedFilm = await prisma.film.update({
                where: {
                    id: filmId
                },
                data: {
                    crew_members: {
                        connect: {
                            id: crewMemberId
                        }
                    }
                },
                include: {
                    crew_members: true
                }
            })
            return assignedFilm
        } catch (error) {
            throw error
        }
    }    
    async unassignActor (filmId: number, actorId: number) {
        try {
            const filmExists = await prisma.film.findUnique({
                where: { id: filmId },
                include: { actors: true }
            });
            if (!filmExists) { throw ApiError.NotFound(`Film with ID ${filmId} not found.`); }
    
            const actorExists = await prisma.actor.findUnique({
                where: { id: actorId },
            });
            if (!actorExists) { throw ApiError.NotFound(`Actor with ID ${actorId} not found.`); }
    
            const isActorAssigned = filmExists.actors.some(actor => actor.id === actorId);
            if (!isActorAssigned) { throw ApiError.BadRequest(`Actor with ID ${actorId} is not assigned to Film with ID ${filmId}.`); }
    
            const updatedFilm = await prisma.film.update({
                where: { id: filmId },
                data: {
                    actors: {
                        disconnect: { id: actorId },
                    },
                },
                include: { actors: true },
            });
            return updatedFilm; 
        } catch (error) {
            throw error
        }
    }    
    async unassignCrewMember(filmId: number, crewMemberId: number) {
        try {
            const filmExists = await prisma.film.findUnique({
                where: { id: filmId },
                include: { crew_members: true }
            });
            if (!filmExists) {
                throw ApiError.NotFound(`Film with ID ${filmId} not found.`);
            }
    
            const crewMemberExists = await prisma.crewMember.findUnique({
                where: { id: crewMemberId },
            });
            if (!crewMemberExists) {
                throw ApiError.NotFound(`Crew member with ID ${crewMemberId} not found.`);
            }
    
            const isCrewMemberAssigned = filmExists.crew_members.some(crewMember => crewMember.id === crewMemberId);
            if (!isCrewMemberAssigned) {
                throw ApiError.BadRequest(`Crew member with ID ${crewMemberId} is not assigned to Film with ID ${filmId}.`);
            }
    
            const updatedFilm = await prisma.film.update({
                where: { id: filmId },
                data: {
                    crew_members: {
                        disconnect: { id: crewMemberId },
                    },
                },
                include: { crew_members: true },
            });
    
            return updatedFilm;
        } catch (error) {
            throw error;
        }
    }
       
}

export default new FilmsService()