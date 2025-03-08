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
            print(f"{num1} + {num2} = {add(num1, num2)}")
        elif choice == '2':
            print(f"{num1} - {num2} = {subtract(num1, num2)}")
        elif choice == '3':
            print(f"{num1} * {num2} = {multiply(num1, num2)}")
        elif choice == '4':
            result = divide(num1, num2)
            print(f"{num1} / {num2} = {result}")
    else:
        print("Invalid input")`,
    language: "python"
  }
];

export const intermediateProjects: Project[] = [
  {
    name: "File Organizer",
    description: "A program that organizes files in a directory based on their extensions",
    code: `import os
import shutil
def organize_files(directory):
    for filename in os.listdir(directory):
        if os.path.isfile(os.path.join(directory, filename)):
            file_extension = filename.split('.')[-1]
            folder_path = os.path.join(directory, file_extension)
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)
            shutil.move(os.path.join(directory, filename), os.path.join(folder_path, filename))
    print("Files organized successfully!")
directory_path = "./test_files"
organize_files(directory_path)`,
    language: "python",
    output: `Files organized into folders based on file type.
Example structure:
- test_files/
  - pdf/
    - resume.pdf
  - jpg/
    - photo.jpg
  - txt/
    - notes.txt
Files organized successfully!`
  }
];

export const difficultyLevels = [
  {
    title: "Beginner",
    description: "Perfect for those just starting their coding journey",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-green-500/20 to-emerald-500/20",
    projects: beginnerProjects
  },
  {
    title: "Intermediate",
    description: "For coders with some experience under their belt",
    icon: <Zap className="w-6 h-6" />,
    color: "from-blue-500/20 to-indigo-500/20",
    projects: intermediateProjects
  },
  {
    title: "Advanced",
    description: "Challenge yourself with complex projects",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-purple-500/20 to-pink-500/20",
    projects: []
  }
];
