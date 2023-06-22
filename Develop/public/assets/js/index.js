let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelector('.list-container .list-group');
}

const show = (elem) => {
  elem.style.display = 'inline';
};

const hide = (elem) => {
  elem.style.display = 'none';
};

let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote)
    .then(() => {
      getAndRenderNotes();
      renderActiveNote();
    })
    .catch((error) => console.error('Error saving note:', error));
};

const handleNoteDelete = (e) => {
  e.stopPropagation();
  const note = e.target.parentElement;
  const noteId = note.dataset.noteId;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId)
    .then(() => {
      getAndRenderNotes();
      renderActiveNote();
    })
    .catch((error) => console.error('Error deleting note:', error));
};

const handleNoteView = (e) => {
  e.preventDefault();
  const note = e.target.closest('.list-group-item');
  const noteId = note.dataset.noteId;
  activeNote = { id: noteId, ...JSON.parse(note.dataset.note) };
  renderActiveNote();
};

const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

const renderNoteList = (notes) => {
  noteList.innerHTML = '';

  if (notes.length === 0) {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');
    liEl.innerText = 'No saved notes';
    noteList.append(liEl);
    return;
  }

  notes.forEach((note) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');
    liEl.dataset.noteId = note.id;

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = note.title;
    spanEl.addEventListener('click', handleNoteView);

    const deleteBtnEl = document.createElement('i');
    deleteBtnEl.classList.add(
      'fas',
      'fa-trash-alt',
      'float-right',
      'text-danger',
      'delete-note'
    );
    deleteBtnEl.addEventListener('click', handleNoteDelete);

    liEl.append(spanEl, deleteBtnEl);
    noteList.append(liEl);
  });
};

const getAndRenderNotes = () =>
  getNotes()
    .then((response) => response.json())
    .then((data) => renderNoteList(data))
    .catch((error) => console.error('Error fetching notes:', error));

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('input', handleRenderSaveBtn);
  noteText.addEventListener('input', handleRenderSaveBtn);
}

getAndRenderNotes();
