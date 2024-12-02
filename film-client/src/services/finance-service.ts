import { $api } from "../api";
import { FinanceCreate } from "../types/response/films";

class FinanceService {
    async create (data:FinanceCreate, filmId: number ) {
        const response = await $api.post(`finance/create/${filmId}`, data)
        console.log('finance create response', response)
    }
    async delete (filmId: number ) {
        const response = await $api.delete(`finance/delete/${filmId}`)
        console.log('finance delete response', response)
    }
}
export default new FinanceService()