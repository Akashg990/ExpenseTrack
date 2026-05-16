import Income from "../models/Income.js";


// ADD INCOME
export const addIncome = async (req, res) => {

  try {

    const {
      source,
      amount,
      description,
      date,
    } = req.body;

    const income = await Income.create({
      user: req.user._id,
      source,
      amount,
      description,
      date,
    });

    res.status(201).json(income);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET INCOME
export const getIncome = async (req, res) => {

  try {

    const income = await Income.find({
      user: req.user._id,
    }).sort({ date: -1 });

    res.json(income);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE INCOME
export const deleteIncome = async (req, res) => {

  try {

    const income = await Income.findById(
      req.params.id
    );

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    if (
      income.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await income.deleteOne();

    res.json({
      message: "Income deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};