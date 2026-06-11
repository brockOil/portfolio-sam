import os
import sys

# Ensure backend folder can be imported on Vercel by adding root path to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.main import app
