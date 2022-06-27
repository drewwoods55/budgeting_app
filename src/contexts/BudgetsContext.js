import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStoarge from "../hooks/useLocalStorage"
// import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export function useBudgets(){
    return useContext(BudgetsContext)
}
// //budgets
// {
//     id:
//     name:
//     max
// }
// //expenses
// {
//     id:
//     budgetId:
//     amount:
//     description:
// }

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStoarge("budgets",[])
    const [expenses, setExpenses] = useLocalStoarge("expenses",[])

            function getBudgetExpenses(budgetId){
                return expenses.filter(expenses => expenses.budgetId === budgetId)
            }
            function addExpense ({ description, amount, budgetId }) { 
                setExpenses(prevExpenses => {
                return [...prevExpenses, { id: uuidV4(), description, amount, budgetId}]
            })
        }
            
            function addBudget ({name,max}) {
                setBudgets(prevBudgets => {
                    if( prevBudgets.find(budget => budget.name === name)) {
                    return prevBudgets
                    }
                    return [...prevBudgets, { id: uuidV4(), name, max}]
                })
            }
            function deleteBudget({ id }){
                //TODO deal with expnses
                setBudgets(prevBudgets => {
                    return prevBudgets.filter(budget => budget.id !== id)
                })
            }
            function deleteExpense({ id }){
                setExpenses(prevExpenses => {
                    return prevExpenses.filter(budget => budget.id !== id)
                })
            }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>{children}</BudgetsContext.Provider>
    )
    }