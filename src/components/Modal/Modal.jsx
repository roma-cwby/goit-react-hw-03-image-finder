import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    document
      .querySelector('.Overlay')
      .addEventListener('click', this.closeClick);
    window.addEventListener('keydown', this.closeEsc);
  }

  componentWillUnmount() {
    document
      .querySelector('.Overlay')
      .removeEventListener('click', this.closeClick);
    window.removeEventListener('keydown', this.closeEsc);
  }

  closeClick = e => {
    if (e.target === e.currentTarget) this.props.closeModal();
  };

  closeEsc = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  render() {
    return (
      <div className="Overlay">
        <div className="Modal">{this.props.children}</div>
      </div>
    );
  }
}
