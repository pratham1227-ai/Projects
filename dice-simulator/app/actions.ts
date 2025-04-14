"use server"

export async function rollDice(sides: number): Promise<number> {
  // Simple JavaScript implementation to generate a random number
  return Math.floor(Math.random() * sides) + 1
}
