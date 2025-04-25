import tkinter as tk
from tkinter import font
import requests 
from PIL import Image, ImageTk 
from io import BytesIO

# 🌐 Weather API Setup
API_KEY = "21a07ea6b054a429c96463daf8dce99e"
BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"

# 🔍 Fetch weather data
def get_weather(city):
    try:
        url = f"{BASE_URL}q={city}&appid={API_KEY}&units=metric"
        response = requests.get(url)
        data = response.json()

        if data["cod"] != 200:
            label_info["text"] = "❌ City not found!"
            label_icon.config(image="")
            return

        temp = data["main"]["temp"]
        desc = data["weather"][0]["description"].title()
        icon_code = data["weather"][0]["icon"]

        label_info["text"] = f"🌡️ {temp}°C\n📝 {desc}"

        # 📸 Load weather icon
        icon_url = f"http://openweathermap.org/img/wn/{icon_code}@2x.png"
        icon_response = requests.get(icon_url)
        img_data = icon_response.content
        img = Image.open(BytesIO(img_data))
        icon_img = ImageTk.PhotoImage(img)

        label_icon.config(image=icon_img)
        label_icon.image = icon_img

    except Exception as e:
        label_info["text"] = f"Error: {e}"

# 🧱 GUI Setup
root = tk.Tk()
root.title("☁️ Weather App")
root.geometry("300x400")
root.resizable(False, False)
root.configure(bg="#a1c4fd")  # soft blue gradient feel

# 📝 Fonts
font_large = font.Font(family="Helvetica", size=16, weight="bold")
font_small = font.Font(family="Helvetica", size=12)

# 🌆 City Entry
entry_city = tk.Entry(root, justify="center", font=font_small)
entry_city.pack(pady=20)
entry_city.insert(0, "Enter city")

# 🔘 Button
btn_get = tk.Button(root, text="Get Weather", command=lambda: get_weather(entry_city.get()), font=font_small)
btn_get.pack(pady=10)

# 📷 Icon
label_icon = tk.Label(root, bg="#a1c4fd")
label_icon.pack(pady=10)

# 📄 Weather Info
label_info = tk.Label(root, text="", font=font_large, bg="#a1c4fd", justify="center")
label_info.pack(pady=20)

# 🔁 Loop
root.mainloop()
