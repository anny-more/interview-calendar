export const deleteSlot = (key: string) => {
    const [date_interview, slot] = key.split(' ');
    const isDelete = confirm(`Удалить встречу ${date_interview} в ${slot}?`);
    if (isDelete) {
        fetch('http://localhost:3001/api/deleteSlot', {
            method: 'delete',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({date_interview, slot})
        })
        .then(() => alert('Встреча удалена!'))
        .catch(() => alert('Ошибка удаления'));
    }
};