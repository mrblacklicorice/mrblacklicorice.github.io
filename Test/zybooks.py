import tkinter as tk
from tkinter import filedialog, ttk
import subprocess
import json
import os
import threading
from queue import Queue, Empty

node_process = None
output_queue = Queue()  # Queue to communicate between threads


def run_node_script():
    # Function to run the Node.js script in a separate thread
    global node_process
    user = user_combobox.get()  # Get the selected user from the combobox
    chapter = entry_chapter.get()
    section = entry_section.get()
    display_output = checkbox_var.get()

    script_path = os.path.join(entry_script_path.get(), "zybooks.js")

    # Command to run the Node.js script
    command = ["node", script_path, user,
               chapter, section, str(display_output)]
    print(command)

    def run_command():
        global node_process
        node_process = subprocess.Popen(
            command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, creationflags=subprocess.CREATE_NO_WINDOW)

        for line in iter(node_process.stdout.readline, ''):
            output_queue.put(line)  # Add stdout lines to the queue

        node_process.stdout.close()
        node_process.wait()

        if node_process.stderr:
            for line in iter(node_process.stderr.readline, ''):
                output_queue.put(f"Error: {line}")

    # Start the thread to run the Node.js command
    thread = threading.Thread(target=run_command)
    thread.start()

    # Continuously check for output in the queue
    root.after(100, process_output)


def process_output():
    try:
        while True:
            line = output_queue.get_nowait()
            output_text.insert(tk.END, line)
            output_text.see(tk.END)
    except Empty:
        pass
    root.after(100, process_output)  # Keep checking the queue


def select_directory():
    directory = filedialog.askdirectory(initialdir="C:\\Users\\giris\\Repos\\mrblacklicorice.github.io\\Test",
                                        title="Select Directory")
    entry_script_path.delete(0, tk.END)
    entry_script_path.insert(0, directory)

    load_user_options(directory)


def load_user_options(directory):
    json_path = os.path.join(directory, "login.json")
    try:
        with open(json_path, 'r') as file:
            data = json.load(file)
            users = list(data.keys())
            user_combobox['values'] = users
            user_combobox.current(0)
    except FileNotFoundError:
        output_text.insert(tk.END, f"Error: {json_path} not found.\n")
    except json.JSONDecodeError:
        output_text.insert(
            tk.END, f"Error: Invalid JSON format in {json_path}.\n")


def stop_node_script():
    global node_process
    if node_process:
        node_process.terminate()
        node_process = None
        output_text.insert(tk.END, "Node.js process terminated.\n")


# Create the main window
root = tk.Tk()
root.title("Node Runner")

# Create input fields and labels side by side
tk.Label(root, text="User:").grid(row=0, column=0, padx=5, pady=5)
user_combobox = ttk.Combobox(root)
user_combobox.grid(row=0, column=1, padx=5, pady=5)

tk.Label(root, text="Chapter (number):").grid(row=1, column=0, padx=5, pady=5)
entry_chapter = tk.Entry(root)
entry_chapter.grid(row=1, column=1, padx=5, pady=5)
entry_chapter.insert(0, "1")

tk.Label(root, text="Section (number):").grid(row=2, column=0, padx=5, pady=5)
entry_section = tk.Entry(root)
entry_section.grid(row=2, column=1, padx=5, pady=5)
entry_section.insert(0, "1")

# Script path field
tk.Label(root, text="Script Path:").grid(row=3, column=0, padx=5, pady=5)
entry_script_path = tk.Entry(root, width=40)
entry_script_path.grid(row=3, column=1, padx=5, pady=5)

browse_button = tk.Button(root, text="Browse...", command=select_directory)
browse_button.grid(row=3, column=2, padx=5, pady=5)
entry_script_path.insert(
    0, "C:\\Users\\giris\\Repos\\mrblacklicorice.github.io\\Test\\")
load_user_options(entry_script_path.get())

# Checkbox for display output
checkbox_var = tk.BooleanVar()
checkbox = tk.Checkbutton(root, text="Display Window", variable=checkbox_var)
checkbox.grid(row=4, columnspan=3, padx=5, pady=5)

# Frame for buttons
button_frame = tk.Frame(root)
button_frame.grid(row=5, column=0, columnspan=3, padx=5, pady=5)

run_button = tk.Button(button_frame, text="Run", command=run_node_script)
run_button.grid(row=0, column=0, padx=5)

stop_button = tk.Button(button_frame, text="Stop", command=stop_node_script)
stop_button.grid(row=0, column=1, padx=5)

root.grid_columnconfigure(0, weight=1)
root.grid_columnconfigure(1, weight=1)
root.grid_columnconfigure(2, weight=1)

# Output text area
output_text = tk.Text(root, height=10, width=50)
output_text.grid(row=6, columnspan=3, padx=5, pady=5)

# Start Tkinter main loop
root.mainloop()
