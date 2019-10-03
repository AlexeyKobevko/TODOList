import './Todo.scss';

import React, {Fragment, useState } from 'react';

export const Todo = props => {
  const { task, token, editStatus, editText } = props;
  const [text, setText] = useState(task.text);
  return (
      <li className="todo-list__item">
        <div className="task__user-info-wrapper">
          <div className="user-info__img-wrapper">
            <img src={task.image_path ? task.image_path : `https://ui-avatars.com/api/?name=${task.username}`}
                 alt={task.username}
            />
          </div>
          <div className="user-info">
            <div>Имя пользователя: <span>{task.username}</span></div>
            <div>email: <span>{task.email}</span></div>
          </div>
        </div>
        {
          !token
            ?
            <div className="task-text">
              <span>Текст задачи:</span>
              <p>{task.text}</p>
            </div>
            :
            <textarea onChange={(e) => setText(e.target.value)} className="edit-text" cols={49} value={text} name="text" />
        }
        <div className="task-status">
          Статус:
          <span>
            {!task.status  ? ' В процессе...' : ' Выполнено'}
          </span>
        </div>
        {
          token &&
              <div className="admin-panel">
                <div onClick={() => editStatus(task.id, task.status)} className="btn">Изменить статус</div>
                <div onClick={() => editText(task.id, text)} className="btn">Редактировать текст</div>
              </div>
        }
      </li>
  );
};