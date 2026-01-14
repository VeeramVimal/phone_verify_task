const successResponse = (req, res, message = "", data, code = 200) => {
    res.send({
        code,
        data,
        status: true,
        message
    })
}

const errorResponse = (req, res, errorMessage = "Something went wrong", code = 500, error={}) => {
    res.send({
        code,
        errorMessage,
        error,
        data: null,
        status: false
    });
}

module.exports = {
    successResponse,
    errorResponse
}