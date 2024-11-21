const zod = require("zod");

const createTodoSchema = zod.object({
    title: zod.string().min(1, { message: "First Name is required" }),
    description: zod.string()
})

const checkIdSchema = zod.object({
    id: zod.string(),
})


const validateData = (data, schema) => {
    const { success } = schema.safeParse(data)
    return success;
}

module.exports = {
    createTodo: (data) => validateData(data, createTodoSchema),
    checkId: (data) => validateData(data, checkIdSchema)
}