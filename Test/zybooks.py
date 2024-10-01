import tkinter as tk
from tkinter import filedialog, ttk
import subprocess
import json
import os


node_process = None


def run_node_script():
    global node_process
    user = user_combobox.get()  # Get the selected user from the combobox
    chapter = entry_chapter.get()
    section = entry_section.get()
    display_output = checkbox_var.get()

    # Get the path from the entry field
    script_path = os.path.join(entry_script_path.get(), "zybooks.js")

    # Construct the command to run the Node.js script
    command = ["node", script_path, user,
               chapter, section, str(display_output)]
    print(command)

  # Run the command
    node_process = subprocess.run(
        command, capture_output=True, text=True, creationflags=subprocess.CREATE_NO_WINDOW)

    # Display the output in the text area
    output_text.delete(1.0, tk.END)  # Clear previous output
    output_text.insert(tk.END, node_process.stdout)
    if node_process.stderr:
        output_text.insert(tk.END, f"Error: {node_process.stderr}")


def select_directory():
    directory = filedialog.askdirectory(initialdir="C:\\Users\\giris\\Repos\\mrblacklicorice.github.io\\Test",
                                        title="Select Directory")
    entry_script_path.delete(0, tk.END)  # Clear the entry field
    entry_script_path.insert(0, directory)  # Insert the selected directory

    # Load user options from login.json
    load_user_options(directory)


def load_user_options(directory):
    # Path to login.json
    json_path = os.path.join(directory, "login.json")
    try:
        with open(json_path, 'r') as file:
            data = json.load(file)
            users = list(data.keys())
            # Clear and update the combobox with user options
            user_combobox['values'] = users
            user_combobox.current(0)  # Select the first user by default
    except FileNotFoundError:
        output_text.insert(tk.END, f"Error: {json_path} not found.\n")
    except json.JSONDecodeError:
        output_text.insert(
            tk.END, f"Error: Invalid JSON format in {json_path}.\n")


def stop_node_script():
    global node_process
    if node_process:
        node_process.terminate()  # Terminate the process
        node_process = None  # Reset the reference
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
entry_chapter.insert(0, "1")  # Autofill chapter

tk.Label(root, text="Section (number):").grid(row=2, column=0, padx=5, pady=5)
entry_section = tk.Entry(root)
entry_section.grid(row=2, column=1, padx=5, pady=5)
entry_section.insert(0, "1")  # Autofill section

# Create a label and entry for the script path
tk.Label(root, text="Script Path:").grid(row=3, column=0, padx=5, pady=5)
entry_script_path = tk.Entry(root, width=40)
entry_script_path.grid(row=3, column=1, padx=5, pady=5)

# Create a button to open the directory dialog
browse_button = tk.Button(root, text="Browse...", command=select_directory)
browse_button.grid(row=3, column=2, padx=5, pady=5)
entry_script_path.insert(
    0, "C:\\Users\\giris\\Repos\\mrblacklicorice.github.io\\Test\\")  # Autofill path
load_user_options(entry_script_path.get())  # Load user options


# Create a checkbox for displaying output
checkbox_var = tk.BooleanVar()
checkbox = tk.Checkbutton(root, text="Display Window", variable=checkbox_var)
checkbox.grid(row=4, columnspan=3, padx=5, pady=5)

# Create a frame for the buttons
button_frame = tk.Frame(root)
button_frame.grid(row=5, column=0, columnspan=3, padx=5, pady=5)

# Create run button
run_button = tk.Button(button_frame, text="Run", command=run_node_script)
run_button.grid(row=0, column=0, padx=5)  # Place in the frame

# Create stop button
stop_button = tk.Button(button_frame, text="Stop", command=stop_node_script)
stop_button.grid(row=0, column=1, padx=5)  # Place in the frame

# Optionally, add sticky options to center the frame in the main window
root.grid_columnconfigure(0, weight=1)
root.grid_columnconfigure(1, weight=1)
root.grid_columnconfigure(2, weight=1)

# Create a text area to display output
output_text = tk.Text(root, height=10, width=50)
output_text.grid(row=6, columnspan=3, padx=5, pady=5)

# Start the Tkinter main loop
root.mainloop()
