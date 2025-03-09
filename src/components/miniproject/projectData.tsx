import { BookOpen, Zap, Trophy } from 'lucide-react';

export interface Project {
  name: string;
  description: string;
  code: string;
  language: string;
  output?: string;
}

export const beginnerProjects: Project[] = [
  {
    name: "Calculator Program",
    description: "A simple calculator that performs basic arithmetic operations",
    code: `# Simple Calculator Program
def add(x, y):
    return x + y
def subtract(x, y):
    return x - y
def multiply(x, y):
    return x * y
def divide(x, y):
    if y == 0:
        return "Cannot divide by zero!"
    return x / y

while True:
    print("Select operation:")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")
    print("5. Exit")
    choice = input("Enter choice (1-5): ")
    if choice == '5':
        print("Goodbye!")
        break
    if choice in ('1', '2', '3', '4'):
        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))
        if choice == '1':
            print(num1, " + ", num2, " = ", add(num1, num2))
        elif choice == '2':
            print(num1, " - ", num2, " = ", subtract(num1, num2))
        elif choice == '3':
            print(num1, " * ", num2, " = ", multiply(num1, num2))
        elif choice == '4':
            result = divide(num1, num2)
            print(num1, " / ", num2, " = ", result)
    else:
        print("Invalid input")`,
    language: "python"
  },
  {
    name: "To-Do List Application",
    description: "A console-based task management system with file persistence",
    code: `import json
from datetime import datetime

class TodoList:
    def __init__(self):
        self.tasks = []
        self.load_tasks()
    
    def load_tasks(self):
        try:
            with open('tasks.json', 'r') as file:
                self.tasks = json.load(file)
        except FileNotFoundError:
            self.tasks = []
    
    def save_tasks(self):
        with open('tasks.json', 'w') as file:
            json.dump(self.tasks, file, indent=2)
    
    def add_task(self, title, description=""):
        task = {
            'id': len(self.tasks) + 1,
            'title': title,
            'description': description,
            'completed': False,
            'created_at': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        self.tasks.append(task)
        self.save_tasks()
        print("Task added successfully!")
    
    def view_tasks(self):
        if not self.tasks:
            print("No tasks found!")
            return
        
        print("\nYour To-Do List:")
        print("-" * 50)
        for task in self.tasks:
            status = "✓" if task['completed'] else " "
            print(f"{task['id']}. [{status}] {task['title']}")
            if task['description']:
                print(f"   Description: {task['description']}")
            print(f"   Created: {task['created_at']}")
            print("-" * 50)
    
    def mark_completed(self, task_id):
        for task in self.tasks:
            if task['id'] == task_id:
                task['completed'] = True
                self.save_tasks()
                print("Task marked as completed!")
                return
        print("Task not found!")
    
    def delete_task(self, task_id):
        for task in self.tasks:
            if task['id'] == task_id:
                self.tasks.remove(task)
                self.save_tasks()
                print("Task deleted successfully!")
                return
        print("Task not found!")

def main():
    todo = TodoList()
    while True:
        print("\n=== To-Do List Menu ===")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Mark Task as Completed")
        print("4. Delete Task")
        print("5. Exit")
        
        choice = input("\nEnter your choice (1-5): ")
        
        if choice == '1':
            title = input("Enter task title: ")
            description = input("Enter task description (optional): ")
            todo.add_task(title, description)
        elif choice == '2':
            todo.view_tasks()
        elif choice == '3':
            task_id = int(input("Enter task ID to mark as completed: "))
            todo.mark_completed(task_id)
        elif choice == '4':
            task_id = int(input("Enter task ID to delete: "))
            todo.delete_task(task_id)
        elif choice == '5':
            print("Thank you for using the To-Do List application!")
            break
        else:
            print("Invalid choice! Please try again.")

if __name__ == "__main__":
    main()`,
    language: "python",
    output: `=== To-Do List Menu ===
1. Add Task
2. View Tasks
3. Mark Task as Completed
4. Delete Task
5. Exit

Enter your choice (1-5): 1
Enter task title: Complete Python Project
Enter task description (optional): Finish the todo list application
Task added successfully!

Enter your choice (1-5): 2

Your To-Do List:
--------------------------------------------------
1. [ ] Complete Python Project
   Description: Finish the todo list application
   Created: 2024-03-14 15:30:45
--------------------------------------------------

Enter your choice (1-5): 3
Enter task ID to mark as completed: 1
Task marked as completed!

Enter your choice (1-5): 2

Your To-Do List:
--------------------------------------------------
1. [✓] Complete Python Project
   Description: Finish the todo list application
   Created: 2024-03-14 15:30:45
--------------------------------------------------

Enter your choice (1-5): 5
Thank you for using the To-Do List application!`
  },
  {
    name: "Password Generator",
    description: "A program that generates strong, random passwords based on user preferences",
    code: `import random
import string
import tkinter as tk
from tkinter import ttk
import pyperclip

class PasswordGenerator:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Password Generator")
        self.window.geometry("400x500")
        self.setup_gui()
        
    def setup_gui(self):
        # Length Frame
        length_frame = ttk.LabelFrame(self.window, text="Password Length")
        length_frame.pack(padx=20, pady=10, fill="x")
        
        self.length_var = tk.IntVar(value=12)
        length_scale = ttk.Scale(
            length_frame, 
            from_=8, 
            to=32, 
            variable=self.length_var,
            orient="horizontal"
        )
        length_scale.pack(padx=10, pady=5, fill="x")
        
        # Character Types Frame
        chars_frame = ttk.LabelFrame(self.window, text="Character Types")
        chars_frame.pack(padx=20, pady=10, fill="x")
        
        self.uppercase_var = tk.BooleanVar(value=True)
        self.lowercase_var = tk.BooleanVar(value=True)
        self.numbers_var = tk.BooleanVar(value=True)
        self.special_var = tk.BooleanVar(value=True)
        
        ttk.Checkbutton(chars_frame, text="Uppercase (A-Z)", 
                       variable=self.uppercase_var).pack(padx=10, pady=5, anchor="w")
        ttk.Checkbutton(chars_frame, text="Lowercase (a-z)", 
                       variable=self.lowercase_var).pack(padx=10, pady=5, anchor="w")
        ttk.Checkbutton(chars_frame, text="Numbers (0-9)", 
                       variable=self.numbers_var).pack(padx=10, pady=5, anchor="w")
        ttk.Checkbutton(chars_frame, text="Special Characters (!@#$%^&*)", 
                       variable=self.special_var).pack(padx=10, pady=5, anchor="w")
        
        # Generate Button
        ttk.Button(self.window, text="Generate Password", 
                  command=self.generate_password).pack(pady=20)
        
        # Password Display
        self.password_var = tk.StringVar()
        password_entry = ttk.Entry(
            self.window, 
            textvariable=self.password_var, 
            font=('Courier', 12),
            justify="center"
        )
        password_entry.pack(padx=20, pady=10, fill="x")
        
        # Copy Button
        ttk.Button(self.window, text="Copy to Clipboard", 
                  command=self.copy_to_clipboard).pack(pady=10)
        
    def generate_password(self):
        chars = ""
        if self.uppercase_var.get():
            chars += string.ascii_uppercase
        if self.lowercase_var.get():
            chars += string.ascii_lowercase
        if self.numbers_var.get():
            chars += string.digits
        if self.special_var.get():
            chars += string.punctuation
            
        if not chars:
            self.password_var.set("Please select at least one character type")
            return
            
        password = ''.join(random.choice(chars) for _ in range(self.length_var.get()))
        self.password_var.set(password)
        
    def copy_to_clipboard(self):
        password = self.password_var.get()
        if password and not password.startswith("Please select"):
            pyperclip.copy(password)
    
    def run(self):
        self.window.mainloop()

if __name__ == "__main__":
    app = PasswordGenerator()
    app.run()`,
    language: "python",
    output: `=== Password Generator ===

[GUI Window Launched]
Password Length: 16
Character Types Selected:
- Uppercase (A-Z)
- Lowercase (a-z)
- Numbers (0-9)
- Special Characters

Generated Password: Kj9#mP2$nL5@vX4
Password copied to clipboard!`
  },
  {
    name: "Quiz Game",
    description: "A simple quiz game that asks multiple-choice questions and keeps track of the score",
    code: `import json
import random
import tkinter as tk
from tkinter import ttk, messagebox

class QuizGame:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Quiz Game")
        self.window.geometry("600x400")
        
        self.questions = self.load_questions()
        self.current_question = 0
        self.score = 0
        self.setup_gui()
        
    def load_questions(self):
        questions = [
            {
                "question": "What is the capital of France?",
                "options": ["London", "Berlin", "Paris", "Madrid"],
                "correct": 2
            },
            {
                "question": "Which planet is known as the Red Planet?",
                "options": ["Venus", "Mars", "Jupiter", "Saturn"],
                "correct": 1
            },
            {
                "question": "What is the largest mammal in the world?",
                "options": ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                "correct": 1
            }
        ]
        return questions
    
    def setup_gui(self):
        # Question Frame
        self.question_frame = ttk.LabelFrame(self.window, text="Question")
        self.question_frame.pack(padx=20, pady=10, fill="both", expand=True)
        
        self.question_label = ttk.Label(
            self.question_frame,
            wraplength=500,
            font=('Helvetica', 12)
        )
        self.question_label.pack(padx=10, pady=10)
        
        # Options Frame
        self.options_frame = ttk.Frame(self.question_frame)
        self.options_frame.pack(padx=10, pady=10, fill="both")
        
        self.selected_option = tk.IntVar()
        self.option_buttons = []
        
        # Score Label
        self.score_label = ttk.Label(
            self.window,
            text="Score: 0",
            font=('Helvetica', 10)
        )
        self.score_label.pack(pady=10)
        
        # Next Button
        self.next_button = ttk.Button(
            self.window,
            text="Next",
            command=self.check_answer
        )
        self.next_button.pack(pady=10)
        
        # Start the quiz
        self.show_question()
    
    def show_question(self):
        """Display the current question"""
        if self.current_question < len(self.questions):
            question = self.questions[self.current_question]
            self.question_label.config(text=question["question"])
            
            # Clear previous options
            for button in self.option_buttons:
                button.destroy()
            self.option_buttons.clear()
            
            # Create new option buttons
            for i, option in enumerate(question["options"]):
                button = ttk.Radiobutton(
                    self.options_frame,
                    text=option,
                    variable=self.selected_option,
                    value=i
                )
                button.pack(pady=5, anchor="w")
                self.option_buttons.append(button)
                
            self.selected_option.set(-1)  # Reset selection
            
        else:
            self.show_final_score()
    
    def check_answer(self):
        """Check if the selected answer is correct"""
        if self.selected_option.get() == -1:
            messagebox.showwarning("Warning", "Please select an answer!")
            return
            
        correct = self.questions[self.current_question]["correct"]
        if self.selected_option.get() == correct:
            self.score += 1
            self.score_label.config(text=f"Score: {self.score}")
        
        self.current_question += 1
        self.show_question()
    
    def show_final_score(self):
        """Display the final score"""
        for widget in self.question_frame.winfo_children():
            widget.destroy()
        
        final_score = (self.score / len(self.questions)) * 100
        
        ttk.Label(
            self.question_frame,
            text=f"Quiz Complete!\\nFinal Score: {final_score:.1f}%",
            font=('Helvetica', 14, 'bold')
        ).pack(pady=20)
        
        ttk.Button(
            self.question_frame,
            text="Play Again",
            command=self.restart_quiz
        ).pack(pady=10)
        
        self.next_button.destroy()
    
    def restart_quiz(self):
        """Reset the quiz"""
        self.current_question = 0
        self.score = 0
        self.score_label.config(text="Score: 0")
        self.setup_gui()
    
    def run(self):
        self.window.mainloop()

if __name__ == "__main__":
    app = QuizGame()
    app.run()`,
    language: "python",
    output: `=== Quiz Game ===

Question 1: What is the capital of France?
Options:
1. London
2. Berlin
3. Paris
4. Madrid

Your answer: 3 (Paris)
Correct! Score: 1

Question 2: Which planet is known as the Red Planet?
Options:
1. Venus
2. Mars
3. Jupiter
4. Saturn

Your answer: 2 (Mars)
Correct! Score: 2

Question 3: What is the largest mammal in the world?
Options:
1. African Elephant
2. Blue Whale
3. Giraffe
4. Polar Bear

Your answer: 2 (Blue Whale)
Correct! Score: 3

Quiz Complete!
Final Score: 100.0%
Play Again?`
  },
  {
    name: "Number Guessing Game",
    description: "A simple game where the player tries to guess a random number",
    code: `import random

def play_game():
    # Generate a random number between 1 and 100
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10
    
    print("Welcome to the Number Guessing Game!")
    print(f"I'm thinking of a number between 1 and 100.")
    print(f"You have {max_attempts} attempts to guess it.")
    
    while attempts < max_attempts:
        try:
            # Get player's guess
            guess = int(input("\\nEnter your guess: "))
            attempts += 1
            
            # Check the guess
            if guess < 1 or guess > 100:
                print("Please enter a number between 1 and 100.")
                attempts -= 1  # Don't count invalid guesses
            elif guess < secret_number:
                print("Too low!")
                print(f"Attempts remaining: {max_attempts - attempts}")
            elif guess > secret_number:
                print("Too high!")
                print(f"Attempts remaining: {max_attempts - attempts}")
            else:
                print(f"\\nCongratulations! You guessed the number in {attempts} attempts!")
                return True
                
        except ValueError:
            print("Please enter a valid number.")
            attempts -= 1  # Don't count invalid inputs
    
    print(f"\\nGame Over! The number was {secret_number}.")
    return False

def main():
    while True:
        play_game()
        
        # Ask to play again
        while True:
            play_again = input("\\nWould you like to play again? (yes/no): ").lower()
            if play_again in ['yes', 'no']:
                break
            print("Please enter 'yes' or 'no'.")
        
        if play_again == 'no':
            print("Thanks for playing! Goodbye!")
            break

if __name__ == "__main__":
    main()`,
    language: "python",
    output: `Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You have 10 attempts to guess it.

Enter your guess: 50
Too high!
Attempts remaining: 9

Enter your guess: 25
Too low!
Attempts remaining: 8

Enter your guess: 37
Too low!
Attempts remaining: 7

Enter your guess: 42
Congratulations! You guessed the number in 4 attempts!

Would you like to play again? (yes/no): no
Thanks for playing! Goodbye!`
  },
  {
    name: "AI-Powered Chatbot",
    description: "A chatbot that understands and responds to user queries using Natural Language Processing (NLP)",
    code: `import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import json
import random
import openai
from flask import Flask, request, jsonify

class ChatBot:
    def __init__(self):
        # Download required NLTK data
        nltk.download('punkt')
        nltk.download('stopwords')
        nltk.download('wordnet')
        
        # Initialize NLTK tools
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        
        # Load training data
        self.intents = json.loads(open('intents.json').read())
        
        # Initialize OpenAI (for advanced queries)
        openai.api_key = 'YOUR_API_KEY'
        
        # Initialize conversation context
        self.context = []
    
    def preprocess_text(self, text):
        # Tokenize and lemmatize input
        tokens = word_tokenize(text.lower())
        tokens = [self.lemmatizer.lemmatize(token) 
                 for token in tokens 
                 if token not in self.stop_words]
        return tokens
    
    def get_intent(self, tokens):
        # Match input tokens with intents
        for intent in self.intents['intents']:
            for pattern in intent['patterns']:
                pattern_tokens = self.preprocess_text(pattern)
                if all(token in pattern_tokens for token in tokens):
                    return intent
        return None
    
    def get_openai_response(self, query):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": query}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error getting AI response: {str(e)}"
    
    def get_response(self, text):
        # Preprocess input text
        tokens = self.preprocess_text(text)
        
        # Get matching intent
        intent = self.get_intent(tokens)
        
        if intent:
            # Use predefined responses for known intents
            response = random.choice(intent['responses'])
            
            # Update context
            self.context.append({
                'intent': intent['tag'],
                'input': text,
                'response': response
            })
            
            return response
        else:
            # Use OpenAI for unknown queries
            response = self.get_openai_response(text)
            
            # Update context
            self.context.append({
                'intent': 'unknown',
                'input': text,
                'response': response
            })
            
            return response

# Flask web application
app = Flask(__name__)
chatbot = ChatBot()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if 'message' not in data:
        return jsonify({'error': 'No message provided'}), 400
    
    response = chatbot.get_response(data['message'])
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)

# Example intents.json structure:
"""
{
    "intents": [
        {
            "tag": "greeting",
            "patterns": ["hi", "hello", "hey"],
            "responses": ["Hello!", "Hi there!", "Hey!"]
        },
        {
            "tag": "weather",
            "patterns": ["what's the weather", "weather forecast"],
            "responses": ["Let me check the weather for you..."]
        }
    ]
}
"""`,
    language: "python",
    output: `=== AI Chatbot Demo ===

User: Hello there!
Bot: Hi there! How can I help you today?

User: What's the weather like?
Bot: Let me check the weather for you...
[Fetching weather data...]
Current weather in London: 18°C, Partly Cloudy

User: Tell me a joke
Bot: Here's one: Why don't programmers like nature? It has too many bugs!

User: What is machine learning?
Bot: Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.`
  },
  {
    name: "Stock Market Prediction System",
    description: "A machine learning model that predicts stock prices based on historical data",
    code: `import numpy as np
import pandas as pd
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import matplotlib.pyplot as plt
import seaborn as sns

class StockPredictor:
    def __init__(self):
        self.model = None
        self.scaler = MinMaxScaler()
        self.prediction_days = 60  # Number of days to use for prediction
        
    def fetch_data(self, symbol, start_date, end_date):
        """Fetch stock data from Yahoo Finance"""
        try:
            df = yf.download(symbol, start=start_date, end=end_date)
            return df
        except Exception as e:
            print(f"Error fetching data: {str(e)}")
            return None
    
    def prepare_data(self, data):
        """Prepare data for LSTM model"""
        # Scale the data
        scaled_data = self.scaler.fit_transform(data['Close'].values.reshape(-1, 1))
        
        x_train = []
        y_train = []
        
        for x in range(self.prediction_days, len(scaled_data)):
            x_train.append(scaled_data[x-self.prediction_days:x, 0])
            y_train.append(scaled_data[x, 0])
            
        x_train, y_train = np.array(x_train), np.array(y_train)
        x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
        
        return x_train, y_train
    
    def build_model(self, input_shape):
        """Build LSTM model"""
        model = Sequential()
        
        model.add(LSTM(units=50, return_sequences=True, 
                      input_shape=input_shape))
        model.add(Dropout(0.2))
        
        model.add(LSTM(units=50, return_sequences=True))
        model.add(Dropout(0.2))
        
        model.add(LSTM(units=50))
        model.add(Dropout(0.2))
        
        model.add(Dense(units=1))
        
        model.compile(optimizer='adam', loss='mean_squared_error')
        
        return model
    
    def train_model(self, x_train, y_train, epochs=25, batch_size=32):
        """Train the LSTM model"""
        self.model = self.build_model((x_train.shape[1], 1))
        
        history = self.model.fit(
            x_train, 
            y_train, 
            epochs=epochs, 
            batch_size=batch_size, 
            verbose=1
        )
        
        return history
    
    def predict_future(self, data, days=30):
        """Predict future stock prices"""
        # Prepare input data
        scaled_data = self.scaler.transform(data['Close'].values.reshape(-1, 1))
        
        x_test = []
        x_test.append(scaled_data[-self.prediction_days:, 0])
        x_test = np.array(x_test)
        x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
        
        # Make predictions
        predictions = []
        current_batch = x_test
        
        for _ in range(days):
            current_pred = self.model.predict(current_batch)[0]
            predictions.append(current_pred)
            
            # Update batch for next prediction
            current_batch = np.append(current_batch[:, 1:, :], 
                                    [[current_pred]], axis=1)
        
        # Inverse transform predictions
        predictions = self.scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
        
        return predictions
    
    def calculate_metrics(self, actual, predicted):
        """Calculate performance metrics"""
        mse = np.mean((actual - predicted) ** 2)
        rmse = np.sqrt(mse)
        mae = np.mean(np.abs(actual - predicted))
        
        return {
            'MSE': mse,
            'RMSE': rmse,
            'MAE': mae
        }
    
    def plot_results(self, data, predictions, symbol):
        """Plot actual vs predicted prices"""
        plt.figure(figsize=(16,8))
        plt.plot(data.index, data['Close'], label='Actual Prices')
        
        # Plot predictions
        future_dates = pd.date_range(
            start=data.index[-1], 
            periods=len(predictions)+1, 
            closed='right'
        )
        plt.plot(future_dates, predictions, label='Predicted Prices')
        
        plt.title(f'{symbol} Stock Price Prediction')
        plt.xlabel('Time')
        plt.ylabel('Price')
        plt.legend()
        
        # Add confidence intervals
        plt.fill_between(
            future_dates,
            predictions.flatten() - predictions.std(),
            predictions.flatten() + predictions.std(),
            alpha=0.2
        )
        
        plt.show()
    
    def generate_report(self, data, predictions, metrics, symbol):
        """Generate analysis report"""
        report = f"""
        Stock Analysis Report for {symbol}
        ================================
        
        Training Data Summary:
        - Start Date: {data.index[0].strftime('%Y-%m-%d')}
        - End Date: {data.index[-1].strftime('%Y-%m-%d')}
        - Total Days: {len(data)}
        
        Performance Metrics:
        - Mean Squared Error: ${metrics['MSE'].toFixed(2)}
        - Root Mean Squared Error: ${metrics['RMSE'].toFixed(2)}
        - Mean Absolute Error: ${metrics['MAE'].toFixed(2)}
        
        Predictions Summary:
        - Number of Future Days: {len(predictions)}
        - Predicted Price Range: $${predictions.min().toFixed(2)} - $${predictions.max().toFixed(2)}
        - Average Predicted Price: $${predictions.mean().toFixed(2)}
        
        Confidence Level: 95%
        Standard Deviation: ${predictions.std().toFixed(2)}
        """
        
        return report

# Example usage
if __name__ == "__main__":
    predictor = StockPredictor()
    
    # Fetch historical data
    symbol = "AAPL"
    data = predictor.fetch_data(symbol, "2020-01-01", "2024-01-01")
    
    # Prepare and train model
    x_train, y_train = predictor.prepare_data(data)
    history = predictor.train_model(x_train, y_train)
    
    # Make predictions
    predictions = predictor.predict_future(data, days=30)
    
    # Calculate metrics
    actual = data['Close'].values[-30:]
    metrics = predictor.calculate_metrics(actual, predictions[:30])
    
    # Plot results and generate report
    predictor.plot_results(data, predictions, symbol)
    report = predictor.generate_report(data, predictions, metrics, symbol)
    console.log(report)`,
    language: "python",
    output: `=== Stock Market Prediction System ===

Loading data for AAPL...
Training LSTM model...
Epoch 1/25
progress: [====================] 100%
Loss: 0.0023

Generating predictions...
Analysis complete!

Stock Analysis Report for AAPL
================================
Training Data Summary:
- Start Date: 2020-01-01
- End Date: 2024-01-01
- Total Days: 1008

Performance Metrics:
- Mean Squared Error: ${2.34.toFixed(2)}
- Root Mean Squared Error: ${1.53.toFixed(2)}
- Mean Absolute Error: ${1.12.toFixed(2)}

Predictions Summary:
- Number of Future Days: 30
- Predicted Price Range: $${180.25.toFixed(2)} - $${195.75.toFixed(2)}
- Average Predicted Price: $${188.45.toFixed(2)}

[Displaying price prediction plot with confidence intervals]`
  },
  {
    name: "Automated Resume Screener",
    description: "A tool that scans resumes and ranks them based on job requirements",
    code: `import spacy
import docx2txt
import PyPDF2
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from flask import Flask, request, jsonify

class ResumeScreener:
    def __init__(self):
        # Load SpaCy model
        self.nlp = spacy.load('en_core_web_lg')
        
        # Initialize vectorizer
        self.vectorizer = TfidfVectorizer(stop_words='english')
        
        # Common skills database
        self.skills_db = self.load_skills_database()
        
    def load_skills_database(self):
        """Load predefined skills database"""
        # This would typically load from a JSON/CSV file
        return {
            'programming': ['python', 'java', 'javascript', 'c++', 'ruby'],
            'web': ['html', 'css', 'react', 'angular', 'node.js'],
            'database': ['sql', 'mongodb', 'postgresql', 'mysql'],
            'tools': ['git', 'docker', 'kubernetes', 'jenkins'],
            'soft_skills': ['leadership', 'communication', 'teamwork']
        }
    
    def extract_text_from_pdf(self, pdf_path):
        """Extract text from PDF file"""
        text = ""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text()
        except Exception as e:
            print(f"Error extracting PDF text: {str(e)}")
        return text
    
    def extract_text_from_docx(self, docx_path):
        """Extract text from DOCX file"""
        try:
            text = docx2txt.process(docx_path)
            return text
        except Exception as e:
            print(f"Error extracting DOCX text: {str(e)}")
            return ""
    
    def extract_text(self, file_path):
        """Extract text based on file type"""
        if file_path.endswith('.pdf'):
            return self.extract_text_from_pdf(file_path)
        elif file_path.endswith('.docx'):
            return self.extract_text_from_docx(file_path)
        else:
            return ""
    
    def extract_skills(self, text):
        """Extract skills from text"""
        skills = []
        doc = self.nlp(text.lower())
        
        # Extract skills using pattern matching and NER
        for category, skill_list in self.skills_db.items():
            for skill in skill_list:
                if skill in text.lower():
                    skills.append(skill)
        
        # Extract additional skills using NER
        for ent in doc.ents:
            if ent.label_ in ['ORG', 'PRODUCT']:
                skills.append(ent.text)
        
        return list(set(skills))
    
    def extract_education(self, text):
        """Extract education information"""
        education = []
        education_keywords = ['bachelor', 'master', 'phd', 'degree']
        
        doc = self.nlp(text)
        for sent in doc.sents:
            if any(keyword in sent.text.lower() for keyword in education_keywords):
                education.append(sent.text.strip())
        
        return education
    
    def extract_experience(self, text):
        """Extract work experience"""
        experience = []
        doc = self.nlp(text)
        
        # Look for date patterns and job titles
        for sent in doc.sents:
            if re.search(r'\\d{4}', sent.text):  # Contains year
                experience.append(sent.text.strip())
        
        return experience
    
    def calculate_similarity(self, job_description, resume_text):
        """Calculate similarity between job description and resume"""
        texts = [job_description, resume_text]
        tfidf_matrix = self.vectorizer.fit_transform(texts)
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        return similarity
    
    def rank_resumes(self, job_description, resume_files):
        """Rank resumes based on job description"""
        rankings = []
        
        for resume_file in resume_files:
            resume_text = self.extract_text(resume_file)
            
            # Extract information
            skills = self.extract_skills(resume_text)
            education = self.extract_education(resume_text)
            experience = self.extract_experience(resume_text)
            
            # Calculate similarity
            similarity = self.calculate_similarity(job_description, resume_text)
            
            # Calculate score (weighted average)
            required_skills = self.extract_skills(job_description)
            skill_match = len(set(skills) & set(required_skills)) / len(required_skills)
            
            score = (similarity * 0.4 + skill_match * 0.6) * 100
            
            rankings.append({
                'file': resume_file,
                'score': score,
                'skills': skills,
                'education': education,
                'experience': experience,
                'similarity': similarity
            })
        
        # Sort by score
        rankings.sort(key=lambda x: x['score'], reverse=True)
        return rankings
    
    def generate_report(self, rankings, job_description):
        """Generate detailed screening report"""
        report = {
            'job_analysis': {
                'required_skills': self.extract_skills(job_description),
                'total_candidates': len(rankings),
                'average_score': sum(r['score'] for r in rankings) / len(rankings)
            },
            'candidate_rankings': rankings,
            'recommendations': []
        }
        
        # Add recommendations
        for rank in rankings[:3]:  # Top 3 candidates
            report['recommendations'].append({
                'file': rank['file'],
                'score': rank['score'],
                'strengths': [
                    skill for skill in rank['skills'] 
                    if skill in report['job_analysis']['required_skills']
                ],
                'missing_skills': [
                    skill for skill in report['job_analysis']['required_skills'] 
                    if skill not in rank['skills']
                ]
            })
        
        return report

# Flask web application
app = Flask(__name__)
screener = ResumeScreener()

@app.route('/screen', methods=['POST'])
def screen_resumes():
    try:
        data = request.get_json()
        job_description = data['job_description']
        resume_files = data['resume_files']
        
        rankings = screener.rank_resumes(job_description, resume_files)
        report = screener.generate_report(rankings, job_description)
        
        return jsonify(report)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)`,
    language: "python",
    output: `=== Resume Screening Results ===

Job Analysis:
Required Skills: ['python', 'machine learning', 'sql', 'data analysis']
Total Candidates: 3
Average Score: 75.5

Top Candidates:
1. candidate1.pdf (Score: 92.5)
   Strengths: python, machine learning, sql
   Missing Skills: data analysis
   Education: Master's in Computer Science
   Experience: 3 years ML Engineer

2. candidate2.pdf (Score: 85.0)
   Strengths: python, data analysis, sql
   Missing Skills: machine learning
   Education: Bachelor's in Data Science
   Experience: 2 years Data Analyst

3. candidate3.pdf (Score: 49.0)
   Strengths: python, sql
   Missing Skills: machine learning, data analysis
   Education: Bachelor's in Computer Engineering
   Experience: 1 year Software Developer

[Generated detailed PDF report with visualizations]`
  }
];

export const difficultyLevels = [
  {
    title: "Beginner",
    description: "Start with the basics",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-green-500/20 to-emerald-500/20",
    projects: beginnerProjects
  },
  {
    title: "Intermediate",
    description: "Build on your knowledge",
    icon: <Zap className="w-6 h-6" />,
    color: "from-blue-500/20 to-cyan-500/20",
    projects: intermediateProjects
  },
  {
    title: "Advanced",
    description: "Challenge yourself",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-purple-500/20 to-pink-500/20",
    projects: advancedProjects
  }
];
