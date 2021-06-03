import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreatAppointmentService'

const appointmentsRouter = Router()

const appointmentsRepository = new AppointmentsRepository()

// DTO: Data Transfer Object
// SoC: Separation Of Concerns (Separação de preocupações)
// para deixar as rotas para menos responsabilidades
// Rota: receber a requisição, chamar outro arquio, devolver uma resposta
// service: tem uma única funcionalidade.

// GET Listar todos os agendamentos.
appointmentsRouter.get('/', (request, response) => {
  try {
    const appointments = appointmentsRepository.all()
    return response.json(appointments)
  } catch (err) {
    response.status(400).json({ error: err.message })
  }
})

// POST Criar um Agendamento (http://localhost:3333/appointments)
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date) // transforma a data

    const createAppointment = new CreateAppointmentService(appointmentsRepository)

    const appointment = createAppointment.execute({ date: parsedDate, provider })

    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default appointmentsRouter
