import { ApiError } from "../exceptions/api-error"
import prisma from "../prisma/prismaClient"

class ScriptService {
    async getOne(filmId: number) {
        try{
            const script = await prisma.script.findFirst({ where: { filmId } })
            if(!script) throw ApiError.BadRequest('Script does not exist')
            return script
        } catch(error) {
            throw error
        }

    }

    async delete(filmId: number) {
        try {
            const script = await prisma.script.findFirst({ where: { filmId: filmId } });
            if (!script) throw ApiError.BadRequest('Script does not exist');

            return await prisma.script.delete({where: {id: script.id}});
        } catch (error) {
            throw error;
        }

    }

    async create(filmId: number, data: {content: string}) {
        try{
            const script = await prisma.script.findFirst({ where: { filmId } })
            if(script) throw ApiError.BadRequest('Script for this film already exist')
            
            const newScript = await prisma.script.create({
                data: { ...data, filmId }
            })
            await prisma.film.update({
                where: { id: filmId },
                data: { scriptId: newScript.id },
            });
            return newScript
        } catch(error) {
            throw error
        }

    }
}

export default new ScriptService()