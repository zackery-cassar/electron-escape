# Electron Escape


Settings structure

Venue settings
Name
Login details etc

Escape Room settings
- List of escape rooms
- Each escape room item leads to that escape rooms details page
- Add escape room button underneat

Mqtt broker settings
List mqtt broker


-----

Escape room details
- delete escape room button with 2 prompt verification
- Escape room name
- Duration
- escape room topic
- list of puzzles (optional)
- order (optional but recommended)
- mqtt broker selection


-----

Mqtt broker details:
- delete mqtt broker button that only works if an escape room doesn't exist with it
- mqtt broker hostname or local ip address 
- mqtt port

------


Puzzle details:
- delete puzzle button with 2 prompt verification
- Puzzle name
- Puzzle topic
- is tech toggle
- puzzle solution (optional)
- list of hints (optional)
- order (optional but recommended)

Hint detail:
- delete hints without 2 prompt verification
- hint title
- hint content (actual hint)
- order (optional but recommended)

