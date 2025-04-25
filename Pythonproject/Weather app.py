import streamlit as st
import requests

API_KEY = "your_api_key_here"
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

# UI
st.set_page_config(page_title="Weather App", page_icon="⛅")
st.title("🌦️ Weather App")

city = st.text_input("Enter city name", "")

if st.button("Get Weather"):
    if city:
        url = f"{BASE_URL}?q={city}&appid={API_KEY}&units=metric"
        response = requests.get(url)
        data = response.json()

        if data.get("cod") != 200:
            st.error(f"City not found: {city}")
        else:
            temp = data["main"]["temp"]
            weather = data["weather"][0]["description"].title()
            icon = data["weather"][0]["icon"]
            icon_url = f"http://openweathermap.org/img/wn/{icon}@2x.png"

            st.image(icon_url)
            st.metric(label="Temperature", value=f"{temp}°C")
            st.success(f"Condition: {weather}")
    else:
        st.warning("Please enter a city name.")
