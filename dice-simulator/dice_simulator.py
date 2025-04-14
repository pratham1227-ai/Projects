import random

def roll_dice(sides):
    """
    Simulates rolling a dice with the specified number of sides.
    
    Args:
        sides (int): The number of sides on the dice
        
    Returns:
        int: A random number between 1 and the number of sides
    """
    return random.randint(1, sides)

# Example usage
if __name__ == "__main__":
    # Define common dice types
    dice_types = {
        "d4": 4,
        "d6": 6,
        "d8": 8,
        "d10": 10,
        "d12": 12,
        "d20": 20
    }
    
    print("Python Dice Simulator")
    print("====================")
    
    # Roll each type of dice once
    print("\nRolling each type of dice:")
    for dice_name, sides in dice_types.items():
        result = roll_dice(sides)
        print(f"{dice_name}: {result}")
    
    # Roll multiple d6 dice (simulating rolling 3d6)
    print("\nRolling 3d6:")
    total = 0
    rolls = []
    for _ in range(3):
        roll = roll_dice(6)
        rolls.append(roll)
        total += roll
    
    print(f"Individual rolls: {rolls}")
    print(f"Total: {total}")
