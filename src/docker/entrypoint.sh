#!/bin/sh
LOGFILE="/app/ismail.log"
VERSION=$(node -p -e "require('./package.json').version") || "0"
##### Helper Functions #####
timestamp() {
  date +"%Y-%m-%d - %H:%M:%S"
}
greenCheckmark() {
  printf "\e[32m✔\e[0m"
}
redCross() {
  printf "\e[31m✘\e[0m"
}

blueOptional() {
  printf "\e[34m?\e[0m"
}

# Function to log messages in JSON format
log_message() {
    local level="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    # Check if file exists, if not create it
    if [ ! -f $LOGFILE ]; then
        echo "[]" > $LOGFILE
    fi

    # Append the new log entry to the JSON array
    jq --arg timestamp "$timestamp" --arg level "$level" --arg message "$message" \
       '. += [{"timestamp": $timestamp, "level": $level, "message": $message}]' \
       $LOGFILE > $LOGFILE.tmp && mv $LOGFILE.tmp $LOGFILE
}

##### Main Script #####
echo "---------------------------------------------------------------"
echo "| iSMAIL Startup Wizard                                        |"
echo "| Version: $VERSION                                            |"
echo "| copyright: 2025 Niklas Stephan                               |"
echo "---------------------------------------------------------------"
echo "|"
#CHECK ENVIRONMENT VARIABLES
echo "- 1. ENVIRONMENT SETUP ----------------------------------------"
#checking node packages
echo "| $(timestamp): Running package installer in case node modules are not installed."
if pnpm install --silent; then
    echo "| $(timestamp): Required Node.js packages are installed."
else
    echo "$(redCross) Error while installing required Node.js packages."
    exit 1
fi
echo "| $(timestamp): Checking environment variables"
if node /app/app/lib/setup.js; then
    . /app/app/lib/export_env.sh
    echo "| $(timestamp): Environment setup complete"
else
    echo "$(redCross) Environment setup failed. Stopping."
    exit 1
fi

echo "----"
echo "|"
log_message "info" "Starting CDFox application..."

#prepare the database
echo "- 2. DATA SETUP -------------------------------------------"
echo "| $(timestamp): Starting Data Setup"
#if node /usr/src/setup/data.js; then
#    echo "| $(timestamp): Data setup complete"
#else
#    echo "$(redCross) Data setup failed. Stopping."
#    exit 1
#fi
echo "---------------------------------------------------------------"
echo "|"

echo "- 3. APPLICATION STARTUP --------------------------------------"
# if stage is = PRD then run following commands
if [ "$STAGE" = "PRD" ]; then
    echo "| $(timestamp): Starting Build Process"   
    log_message "info" "Starting Build Process"
    pnpm run build
    echo "| $(timestamp): Finished Build Process"
    log_message "success" "Finished Build Process"
    echo "| $(timestamp): Starting $STAGE Server Process"  
    log_message "info" "Starting $STAGE Server Process"
    pnpm run start
fi
# ifs stage is = DEV then run following commands
if [ "$STAGE" = "DEV" ]; then
    echo "| $(timestamp): Starting $STAGE Server Process"  
    log_message "info" "Starting $STAGE Server Process"
    pnpm run dev
    echo "$(redCross) Application crashed/stopped, falling back to OS"
    log_message "fatal" "Application crashed/stopped, falling back to OS"
    echo "| $(timestamp): Starting tail -f /dev/null" 
    #fallback to keep the container running in case npm crashes
    tail -f /dev/null
fi