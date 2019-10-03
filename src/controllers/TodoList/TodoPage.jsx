import './TodoPage.scss';

import React, { Component, Fragment } from 'react';
import {addTodo, editTodoStatus, editTodoText, loadTodos} from "actions/todos";
import { connect}  from "react-redux";
import { Todo } from "components/Todo";
import { Loading } from "components/Loading";
import { AddTodoForm } from "components/AddTodoForm";
import { SortPanel } from "components/SortPanel";
import { PaginationPanel } from "components/PaginationPanel";

class TodoPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      todos: [],
      sortField: 'username',
      sortDirection: 'asc',
      count: '',
      page: 1,
      error: '',
      errorText: '',
      okText: '',
      loading: false,
      okMessage: '',
    };
  }

  componentDidMount() {
    this.props.loadTodos(this.state.sortField, this.state.sortDirection, this.state.page);
    // this.getTasks(this.state.sortField, this.state.sortDirection, this.state.page);
  }

  handleSubmit = (task) => {

    this.setState({
      okMessage: 'Задача успешно добавлена',
    });
    setTimeout(()=>{
      this.setState({
        okMessage: '',
      });
    }, 3000);
    this.props.addTodo(task);
  };

  handleSortField = (field) => {
    this.setState({
      sortField: field,
    });
    // this.getTasks(field, this.state.sortDirection, this.state.page);
    this.props.loadTodos(field, this.state.sortDirection, this.state.page);
  };

  handleSortDirection = (direction) => {

    this.setState({
      sortDirection: direction ? 'asc' : 'desc',
    });
    // this.getTasks(this.state.sortField, direction ? 'asc' : 'desc', this.state.page);
    this.props.loadTodos(this.state.sortField, direction ? 'asc' : 'desc', this.state.page);
  };

  handlePagination = (e) => {
    document.querySelectorAll('.pag-list-item').forEach(el => {
      el.classList.remove('active-pag-item');
    });
    e.target.classList.add('active-pag-item');

    this.setState({
      page: parseInt(e.target.textContent),
    });

    // this.getTasks(this.state.sortField, this.state.sortDirection, e.target.textContent);
    this.props.loadTodos(this.state.sortField, this.state.sortDirection, e.target.textContent);
  };

  handleChangeStatus = (id, status) => {
    if (!this.props.token) {
      this.setState({okMessage: 'Авторизуйтесь'});
      return;
    }
    const rightStatus = status ? 0 : 10;
    this.props.editTodoStatus(id, this.props.token, rightStatus);
  };

  handleChangeText = (id, text) => {
    const targetText = text + ' |Отредактировано администратором|';
    this.props.editTodoText(id, this.props.token, targetText);
  };

  render() {

    const { loading, sortField, sortDirection, page, okMessage } = this.state;
    const { token, todos, count, newTask } = this.props;
    let tasks;
    if (this.props.newTask) {
       tasks = [newTask].concat(todos);
    } else tasks = todos;

    const list = tasks.map((task, idx) => {
      return <Todo
        key={idx} task={task} token={token} editStatus={this.handleChangeStatus} editText={this.handleChangeText} />
    });

    if (loading) return <Loading />;

    return (
      <Fragment>
        <SortPanel
          sortField={sortField}
          sortDirection={sortDirection}
          handleSortField={this.handleSortField}
          handleSortDirection={this.handleSortDirection} />
        <ul>{list}</ul>
        <PaginationPanel callback={this.handlePagination} count={count} page={page} />
        <AddTodoForm token={token} okMessage={okMessage} handleSubmit={this.handleSubmit} />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos.entries,
    count: parseInt(state.todos.count),
    okMessage: state.todos.okMessage,
    newTask: state.todos.newTask,
    token: state.user.token,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: (task) => dispatch(addTodo(task)),
    editTodoStatus: (id, token, status) => dispatch(editTodoStatus(id, token, status)),
    editTodoText: (id, token, text) => dispatch(editTodoText(id, token, text)),
    loadTodos: (sortField, sortDirection, page) => dispatch(loadTodos(sortField, sortDirection, page)),
  }
}

export const TodoContainer = connect(mapStateToProps, mapDispatchToProps)(TodoPage);