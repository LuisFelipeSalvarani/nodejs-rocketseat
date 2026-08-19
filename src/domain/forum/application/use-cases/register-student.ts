import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either.js"
import { Student } from "../../enterprise/entities/student.js"
import { HashGenerator } from "../cryptography/hash-generator.js"
import { StudentsRepository } from "../repositories/students-repository.js"
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error.js"

interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private readonly studentRepository: StudentsRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentWithSameEmail = await this.studentRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentRepository.create(student)

    return right({ student })
  }
}
