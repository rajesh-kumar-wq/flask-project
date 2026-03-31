from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/service")
def service():
    return render_template("service.html")

@app.route("/menu", methods=["GET"])
def get_menu():
    return {
        "items": ["Pizza", "Burger", "Pasta"]
    }

@app.route("/order", methods=["POST"])
def create_order():
    data = request.json
    item = data["item"]

    return {
        "message": f"Order for {item} received!"
    }

if __name__ == "__main__":
    app.run(debug=True)