import mongoose from "mongoose";
import { type } from "os";

const financeSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userTable'
    },
    monthlyIncome: {
        type: Number,
        default: 0,
        max:2^32
    },
    monthlySavings: {
        type: Number,
        default: 0,
        max:2^32
    },
    monthlyExpenses: {
        type: Number,
        default: 0,
        max:2^32  
    },
    targetDailyBudget: {
        type: Number,
        default: 0,
        max:2^32
    },
    avgDailyBudget: {
        type: Number,
        default: 0,
        max:2^32
    },
});

financeSchema.pre("save", function (next) {
    if (!this.monthlyIncome) {
        this.monthlyIncome.parseFloat(this.monthlyIncome.toFixed(2));
    }
    if (!this.monthlySavings) {
        this.monthlySavings.parseFloat(this.monthlySavings.toFixed(2));
    }
    if (!this.monthlyExpenses) {
        this.monthlyExpenses.parseFloat(this.monthlyExpenses.toFixed(2));
    }
    if (!this.targetDailyBudget) {
        this.targetDailyBudget.parseFloat(this.targetDailyBudget.toFixed(2));
    }
    if (!this.avgDailyBudget) {
        this.avgDailyBudget.parseFloat(this.avgDailyBudget.toFixed(2));
    }
    next();
});

export const financeTable = mongoose.model('financeTable', financeSchema);