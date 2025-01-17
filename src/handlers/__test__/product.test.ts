import request from "supertest"
import server from "../../server"
jest.setTimeout(15000)

describe('POST /api/products', () => { 

    test('should display validation errors', async () => {
        const response = await request(server).post('api/products').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveLength(2)

    }, 15000)

    test('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('api/products').send({
            name: 'Monitor Curvo',
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveLength(2)
    }, 15000)
    
    test('should create a new product', async () => {
        const response = await request(server).post('api/products').send({
            name: "Mouse - Testing",
            price: 654136541
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')


    }, 15000)
})
