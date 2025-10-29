const name = "Микита";
        const nameList = document.getElementById('nameList');
        
        name.split('').forEach(letter => {
            const li = document.createElement('li');
            li.textContent = letter;
            li.onmouseover = () => alert(letter);
            nameList.appendChild(li);
        });

        function startInput() {
            while (true) {
                const fullName = prompt("Введіть прізвище та ім'я (або натисніть 'Скасувати'):");
                
                if (fullName === null) {
                    break;
                }
                
                if (fullName.trim() !== "") {
                    const output = document.getElementById('output');
                    const p = document.createElement('p');
                    p.textContent = fullName;
                    output.appendChild(p);
                }
            }
        }

        const surname = "Дерновий"; 
        const toggleButton = document.getElementById('toggleBlocks');
        const lettersContainer = document.getElementById('letters');
        let blocksVisible = false;

        toggleButton.addEventListener('click', () => {
            if (!blocksVisible) {
                surname.split('').forEach(letter => {
                    const block = document.createElement('div');
                    block.className = 'letter-block';
                    block.textContent = letter;
                    block.onmouseover = () => alert(`Це літера ${letter}`);
                    lettersContainer.appendChild(block);
                });
                toggleButton.textContent = "Приховати блоки";
                blocksVisible = true;
            } else {
                lettersContainer.innerHTML = '';
                toggleButton.textContent = "Показати блоки";
                blocksVisible = false;
            }
        });