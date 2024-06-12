

const navItems = document.querySelectorAll('.nav-link');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(prevItem => prevItem.classList.remove('active'));
    item.classList.add('active');
  });
});

document.getElementById('submitButton').addEventListener('click', function() {
    const caseSummary = document.getElementById('caseSummary').value;
    const projectId = document.getElementById('projectId').value;
    const resolved = document.getElementById('resolved').value;
    const workPerformed = document.getElementById('workPerformed').value;
    const documentation = document.getElementById('documentation').value;
    const bugStatus = document.getElementById('bugStatus').value;
    const easeOfWork = document.getElementById('easeOfWork').value;
    const justification = document.getElementById('justification').value;

    // Create the formatted text for the output textarea
    let caseNotesText = `**Case Summary:   ${caseSummary}\n\n`;
    caseNotesText += `**Project ID:   ${projectId}\n\n`;
    caseNotesText += `**Is the issue resolved?   ${resolved}\n\n`;
    caseNotesText += `**Work Performed:  \n${workPerformed}\n\n`;
    caseNotesText += `**Documentation:  \n${documentation}\n\n`;
    caseNotesText += `**Bug Status:   ${bugStatus}\n\n`;
    caseNotesText += `**How easy it was to work this case?   ${easeOfWork}\n`;
    caseNotesText += `**Justification:   ${justification}\n\n`;

    // Set the value of the output textarea
    document.getElementById('caseNotesOutput').value = caseNotesText;
  });


  document.getElementById('submitButton').addEventListener('click', function() {
    // ... existing submit button logic ...
  });

  document.getElementById('copyButton').addEventListener('click', function() {
    const caseNotesText = document.getElementById('caseNotesOutput').value;
    navigator.clipboard.writeText(caseNotesText)
      .then(() => {
        console.log('Case notes copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy case notes:', err);
      });
  });

  const documentationTextarea = document.getElementById('workPerformed');

  // Flag to track if the first line has been initialized
  let isFirstLine = true;

  documentationTextarea.addEventListener('focus', function() {
    if (isFirstLine) {
      // Add "->" to the first line on first focus
      this.value = '->';
      isFirstLine = false;
    }
  });

  documentationTextarea.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !isFirstLine) {
      // Add "->" to the beginning of the new line when Enter is pressed
      this.value += '\n->';
      // Move the cursor to the end of the newly added line
      this.selectionStart = this.selectionEnd = this.value.length;
      event.preventDefault(); // Prevent default form submission on Enter
    }
  });

  let currentNumber = 1; // Variable to track the current number

  document.getElementById('documentation').addEventListener('focus', function(event){
    
      // Get the current text content
      let text = this.value;
    
      // Check if it's the first line
      if (text === '') {
        text = `[${currentNumber}] `;
      
      // increment the counter
      currentNumber++
      // Set the updated text content
      this.value = text;
  
      // Prevent default behavior to avoid adding an extra newline on Enter
      event.preventDefault();
      }
    
  });

  document.getElementById('documentation').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      // Get the current text content
      let text = this.value;
      text += `\n[${currentNumber++}] `;
      // Set the updated text content
      this.value = text;
      // Prevent default behavior to avoid adding an extra newline on Enter
      event.preventDefault();
  
    }
  
    document.getElementById("resetButton").addEventListener('click', function(event){
      currentNumber = 1;
    })
  });