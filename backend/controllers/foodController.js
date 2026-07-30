import { getFoodsCollection } from "../services/foodService.js";

function getFoodsController(req, res) {
    try {
        const foods = getFoodsCollection();

        res.status(200).json({
            success: true,
            data: foods,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export { getFoodsController };