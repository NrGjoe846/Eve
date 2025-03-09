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
  }
];

export const intermediateProjects: Project[] = [];

export const advancedProjects: Project[] = [
  {
    name: "AI-Powered Resume Analyzer",
    description: "An intelligent system that analyzes resumes using NLP and ML to match candidates with job descriptions",
    code: `import spacy
import fitz  # PyMuPDF
from flask import Flask, request, jsonify
from pdfminer.high_level import extract_text
from docx import Document
from sqlalchemy import create_engine, Column, Integer, String, Float, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import json

# Initialize Flask app and database
app = Flask(__name__)
Base = declarative_base()
engine = create_engine('sqlite:///resumes.db')
Session = sessionmaker(bind=engine)

class Resume(Base):
    __tablename__ = 'resumes'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(100))
    phone = Column(String(20))
    skills = Column(Text)
    experience = Column(Float)
    education = Column(Text)
    match_score = Column(Float)

Base.metadata.create_all(engine)

# Load SpaCy model
nlp = spacy.load('en_core_web_sm')

class ResumeAnalyzer:
    def __init__(self):
        self.skill_patterns = [
            'python', 'java', 'javascript', 'react', 'node.js', 'sql',
            'machine learning', 'data analysis', 'project management'
        ]
    
    def extract_text_from_pdf(self, pdf_file):
        """Extract text from PDF file"""
        try:
            doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
            text = ""
            for page in doc:
                text += page.get_text()
            return text
        except Exception as e:
            raise Exception(f"Error extracting text from PDF: {str(e)}")
    
    def extract_text_from_docx(self, docx_file):
        """Extract text from DOCX file"""
        try:
            doc = Document(docx_file)
            return " ".join([paragraph.text for paragraph in doc.paragraphs])
        except Exception as e:
            raise Exception(f"Error extracting text from DOCX: {str(e)}")
    
    def extract_contact_info(self, text):
        """Extract contact information using regex"""
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        phone_pattern = r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b'
        name_pattern = r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})'
        
        email = re.findall(email_pattern, text)
        phone = re.findall(phone_pattern, text)
        name = re.findall(name_pattern, text)
        
        return {
            'name': name[0] if name else None,
            'email': email[0] if email else None,
            'phone': phone[0] if phone else None
        }
    
    def extract_skills(self, text):
        """Extract skills using SpaCy and pattern matching"""
        doc = nlp(text.lower())
        skills = []
        
        # Extract skills using pattern matching
        for skill in self.skill_patterns:
            if skill in doc.text:
                skills.append(skill)
        
        # Extract skills using entity recognition
        for ent in doc.ents:
            if ent.label_ in ['ORG', 'PRODUCT'] and len(ent.text) > 2:
                skills.append(ent.text.lower())
        
        return list(set(skills))
    
    def extract_experience(self, text):
        """Extract years of experience"""
        experience_patterns = [
            r'(\d+)\+?\s*years?\s*of\s*experience',
            r'experience\s*of\s*(\d+)\+?\s*years?'
        ]
        
        for pattern in experience_patterns:
            match = re.search(pattern, text.lower())
            if match:
                return float(match.group(1))
        return 0
    
    def calculate_match_score(self, resume_text, job_description):
        """Calculate match score between resume and job description"""
        vectorizer = TfidfVectorizer()
        vectors = vectorizer.fit_transform([resume_text, job_description])
        similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
        return similarity * 100
    
    def analyze_resume(self, file, job_description):
        """Analyze resume and return structured data"""
        try:
            # Extract text based on file type
            if file.filename.endswith('.pdf'):
                text = self.extract_text_from_pdf(file)
            elif file.filename.endswith('.docx'):
                text = self.extract_text_from_docx(file)
            else:
                raise ValueError("Unsupported file format")
            
            # Extract information
            contact_info = self.extract_contact_info(text)
            skills = self.extract_skills(text)
            experience = self.extract_experience(text)
            match_score = self.calculate_match_score(text, job_description)
            
            # Save to database
            session = Session()
            resume = Resume(
                name=contact_info['name'],
                email=contact_info['email'],
                phone=contact_info['phone'],
                skills=json.dumps(skills),
                experience=experience,
                match_score=match_score
            )
            session.add(resume)
            session.commit()
            
            return {
                'contact_info': contact_info,
                'skills': skills,
                'experience': experience,
                'match_score': match_score,
                'id': resume.id
            }
            
        except Exception as e:
            raise Exception(f"Error analyzing resume: {str(e)}")

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        if 'resume' not in request.files:
            return jsonify({'error': 'No resume file provided'}), 400
            
        file = request.files['resume']
        job_description = request.form.get('job_description', '')
        
        analyzer = ResumeAnalyzer()
        result = analyzer.analyze_resume(file, job_description)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)`,
    language: "python",
    output: `=== Resume Analysis Results ===

Contact Information:
Name: John Smith
Email: john.smith@email.com
Phone: 123-456-7890

Skills Extracted:
- Python
- Machine Learning
- Data Analysis
- SQL
- Project Management
- leadership

Experience: 5 years

Job Match Analysis:
- Overall Match Score: 85.7%
- Skills Match: 90%
- Content Similarity: 76%

Recommendation: Strong match
The candidate's profile strongly aligns with the job requirements, 
particularly in technical skills and experience level.

Database Entry Created: ID #1242
Report generated successfully.`
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
