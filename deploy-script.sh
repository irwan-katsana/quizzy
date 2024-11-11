#!/bin/bash

# Restart the application with PM2
pm2 restart quizzy || pm2 start <entry_file.js> --name quizzy
