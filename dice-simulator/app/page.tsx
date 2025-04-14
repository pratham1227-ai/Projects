"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { rollDice } from "@/app/actions"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"
import { motion } from "framer-motion"

export default function DiceSimulator() {
  const [result, setResult] = useState<number | null>(null)
  const [rolling, setRolling] = useState(false)
  const [diceType, setDiceType] = useState("d6")
  const [history, setHistory] = useState<{ type: string; value: number }[]>([])

  const handleRoll = async () => {
    setRolling(true)

    // Get the number of sides based on the selected dice type
    const sides = Number.parseInt(diceType.substring(1))

    try {
      const roll = await rollDice(sides)

      // Add a small delay to make the animation feel more natural
      setTimeout(() => {
        setResult(roll)
        setHistory((prev) => [{ type: diceType, value: roll }, ...prev.slice(0, 9)])
        setRolling(false)
      }, 700)
    } catch (error) {
      console.error("Error rolling dice:", error)
      setRolling(false)
    }
  }

  const getDiceIcon = (value: number) => {
    if (diceType === "d6") {
      switch (value) {
        case 1:
          return <Dice1 className="h-24 w-24" />
        case 2:
          return <Dice2 className="h-24 w-24" />
        case 3:
          return <Dice3 className="h-24 w-24" />
        case 4:
          return <Dice4 className="h-24 w-24" />
        case 5:
          return <Dice5 className="h-24 w-24" />
        case 6:
          return <Dice6 className="h-24 w-24" />
        default:
          return null
      }
    }

    // For other dice types, just show the number
    return <div className="flex items-center justify-center h-24 w-24 text-4xl font-bold">{value}</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Dice Simulator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Roll a Dice</CardTitle>
            <CardDescription>Select a dice type and click roll</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Tabs defaultValue="d6" className="w-full mb-6" onValueChange={setDiceType}>
              <TabsList className="grid grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="d4">D4</TabsTrigger>
                <TabsTrigger value="d6">D6</TabsTrigger>
                <TabsTrigger value="d8">D8</TabsTrigger>
                <TabsTrigger value="d10">D10</TabsTrigger>
                <TabsTrigger value="d12">D12</TabsTrigger>
                <TabsTrigger value="d20">D20</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="bg-slate-100 rounded-lg p-8 mb-6 w-40 h-40 flex items-center justify-center">
              {rolling ? (
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }}
                  className="text-4xl font-bold"
                >
                  {diceType === "d6" ? <Dice6 className="h-24 w-24" /> : diceType}
                </motion.div>
              ) : result ? (
                getDiceIcon(result)
              ) : (
                <div className="text-gray-400 text-center">Click Roll to start</div>
              )}
            </div>

            <div className="text-center mb-4">
              {result && !rolling && (
                <p className="text-2xl font-bold">
                  You rolled: <span className="text-emerald-600">{result}</span>
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg" onClick={handleRoll} disabled={rolling} className="bg-emerald-600 hover:bg-emerald-700">
              {rolling ? "Rolling..." : "Roll Dice"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Roll History</CardTitle>
            <CardDescription>Your recent dice rolls</CardDescription>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <ul className="space-y-2">
                {history.map((roll, index) => (
                  <li key={index} className="p-2 bg-slate-100 rounded flex justify-between">
                    <span>Roll #{history.length - index}:</span>
                    <span className="font-medium">
                      {roll.type} → <span className="text-emerald-600 font-bold">{roll.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 py-8">No rolls yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
