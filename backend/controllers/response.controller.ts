import { Response as ResponseModel } from "../models/associations.model";
import { Form } from "../models/associations.model";
import { Request, Response as ExpressResponse } from "express";
import { v4 as uuidv4 } from "uuid";

const FORM_PATH = "http://localhost:5173/client/form/";

export async function createResponse(req: Request, res: ExpressResponse) {
  try {
    const { form_id } = req.body;
    const token = uuidv4();

    await ResponseModel.create({ form_id, token });

    res.status(201).json({ path: `${FORM_PATH}${form_id}/${token}` });
  } catch (error: any) {
    console.error("Error creating response:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
}

export async function getResponses(req: Request, res: ExpressResponse) {
  try {
    const { form_id } = req.params;

    const responses = await ResponseModel.findAll({
      where: { form_id },
      raw: true,
    });

    res.status(200).json(responses);
  } catch (error: any) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
}

export async function getResponse(req: Request, res: ExpressResponse) {
  try {
    const { form_id, response_id } = req.params;

    const response = await ResponseModel.findOne({
      where: { form_id, id: response_id },
    });

    if (!response) {
      return res
        .status(404)
        .json({ status: "error", error: "Réponse non trouvée" });
    }

    res.status(200).json(response);
  } catch (error: any) {
    console.error("Error fetching response:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
}

export async function deleteResponse(req: Request, res: ExpressResponse) {
  try {
    const { form_id, response_id } = req.params;

    const response = await ResponseModel.findOne({
      where: { form_id, id: response_id },
    });

    if (!response) {
      return res
        .status(404)
        .json({ status: "error", error: "Réponse non trouvée" });
    }

    await response.destroy();

    res.status(204).send();
  } catch (error: any) {
    console.error("Error deleting response:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
}

export async function deleteResponsesByFormId(
  req: Request,
  res: ExpressResponse
) {
  try {
    const { form_id } = req.params;

    const responses = await ResponseModel.findAll({ where: { form_id } });

    await Promise.all(responses.map((response) => response.destroy()));

    res.status(204).send();
  } catch (error: any) {
    console.error("Error deleting responses:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
}

export async function updateResponse(req: Request, res: ExpressResponse) {
  try {
    const { form_id, response, token } = req.body;

    const existingResponse = await ResponseModel.findOne({
      where: { form_id },
    });

    if (!existingResponse) {
      return res
        .status(404)
        .json({ status: "error", error: "Formulaire non trouvé" });
    }

    if (existingResponse.dataValues.token !== token) {
      return res
        .status(401)
        .json({
          status: "error",
          error: "Vous avez déjà soumis ce formulaire",
        });
    }

    const updatedResponse = await existingResponse.update({
      response: JSON.stringify(response),
      token: "",
    });

    res.status(200).json(updatedResponse.dataValues);
  } catch (error: any) {
    console.error("Error updating response:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
}

export async function getFormPagePath(req: Request, res: ExpressResponse) {
  try {
    const { id } = req.params;

    const form = await Form.findByPk(id);

    if (!form) {
      return res
        .status(404)
        .json({ status: "error", error: "Formulaire non trouvé" });
    }

    const token = uuidv4();

    res
      .status(200)
      .json({ path: `${FORM_PATH}${form.dataValues.id}/${token}` });
  } catch (error: any) {
    console.error("Error getting form page path:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
}
