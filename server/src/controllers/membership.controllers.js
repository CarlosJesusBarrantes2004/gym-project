import { sendErrorResponse, sendResponse } from "../utils/responses.js";

export const getMemberships = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const status = req.query.status;

  if (page < 1)
    sendErrorResponse(next, {
      status: 400,
      message: "Page must be greater than 0",
      code: "PAGE_MUST_BE_GREATER_THAN_0",
    });

  try {
    const result = await req.membershipDb.getMemberships({
      page,
      limit,
      status,
    });

    sendResponse(res, {
      message: "Memberships retrieved successfully",
      data: { memberships: [...result.memberships], meta: { ...result.meta } },
    });
  } catch (error) {
    next(error);
  }
};

export const getMembership = async (req, res, next) => {
  const { dni } = req.params;

  try {
    const result = await req.membershipDb.getMembership(dni);

    if (result.success)
      sendResponse(res, {
        message: "Matrícula encontrada",
        data: { membership: result.membership },
      });
  } catch (error) {
    next(error);
  }
};

export const createMembership = async (req, res, next) => {
  const { name, dni, phone, payment, startDate, endDate } = req.body;

  try {
    const result = await req.membershipDb.createMembership({
      name,
      dni,
      phone,
      payment,
      startDate,
      endDate,
    });

    if (result.success)
      sendResponse(res, {
        status: 201,
        message: "La matrícula ha sido registrada exitosamente",
        data: { membership: result.membership },
      });
  } catch (error) {
    next(error);
  }
};

export const updateMembership = async (req, res, next) => {
  const { id } = req.params;
  const { name, dni, phone, payment, startDate, endDate } = req.body;

  try {
    const result = await req.membershipDb.updateMembership(id, {
      name,
      dni,
      phone,
      payment,
      startDate,
      endDate,
    });

    if (result.success)
      sendResponse(res, {
        message: "La matrícula ha sido actualizada exitosamente",
        data: { membership: result.membership },
      });
  } catch (error) {
    next(error);
  }
};
