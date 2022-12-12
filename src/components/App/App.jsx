import { Component } from 'react';
import { fetchImg } from 'api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    request: '',
    isLoad: false,
    error: false,
    modalImg: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.request !== this.state.request ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoad: true, error: false });
        const newImgs = await fetchImg(this.state.request, this.state.page);

        if (newImgs.length < 1) throw new Error();

        this.setState(prevState => {
          return {
            images: prevState.images.concat(newImgs),
          };
        });
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ isLoad: false });
      }
    }
  }

  onRequest = e => {
    e.preventDefault();
    this.setState(prevState => {
      if (prevState.request !== e.target.elements[1].value) {
      }
      return { request: e.target.elements[1].value, page: 1, images: [] };
    });
  };

  onLoad = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  onModal = e => {
    const largeImg = this.state.images.filter(
      item => item.id === Number(e.target.closest('li').id)
    );

    this.setState({
      modalImg: largeImg[0].largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({ modalImg: null });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onRequest} />

        {this.state.error && (
          <p style={{ color: 'red', margin: 'auto' }}>Error</p>
        )}

        {this.state.modalImg && (
          <Modal img={this.state.modalImg} closeModal={this.closeModal}>
            {<img src={this.state.modalImg} alt="" />}
          </Modal>
        )}

        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} onClick={this.onModal} />
        )}

        {this.state.isLoad && <Loader />}

        {this.state.images.length > 0 && !this.state.isLoad && (
          <Button text="Load more" click={this.onLoad} />
        )}
      </>
    );
  }
}
