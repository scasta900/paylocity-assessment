#!/bin/bash
URL="http://localhost:4000/api/example"

echo "Example API Route"
echo "1. Get all entries"
echo "2. Add entries"

read -r -p "Select one option: " choice

case "$choice" in
	1) curl -s "$URL" | jq '.results |= sort_by(.date) | .results |=reverse' ;;
  2)
     entries=()
     while [[ true ]]; do
       echo "Enter the entry details:"
       read -r -p "Name: " name
       read -r -p "Type: " type
       read -r -p "Description: " description
       read -r -p "Date (YYYY-MM-DD): " date
       temp=$(jq -n --arg name "$name" --arg type "$type" --arg description "$description" --arg date "$date" '{name:$name,type:$type,description:$description,date:$date}')
       entries+=$temp
       read -r -p "Stop adding entries? (Type yes to quit) " option
       if [[ "$option" == "Yes"  || "$option" == "yes" || "$option" == "Y" || $option == "y" ]]; then
         break
       fi 
     done
     entries_json=$(printf '%s\n' "${entries[@]}" | jq -s '.')
     curl -s -X POST "$URL" -H "Content-Type: application/json" -d "$entries_json"
     ;;
  *) echo "Invalid option"
     exit 1
     ;;
esac
