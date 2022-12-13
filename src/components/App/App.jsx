import { Component } from 'react';
import { fetchImg } from 'api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Error } from 'components/Error/Error';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    request: '',
    isLoad: false,
    error: false,
    modalImg: null,
    isAll: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.request !== this.state.request ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoad: true, error: false, isAll: false });
        const newImgs = await fetchImg(this.state.request, this.state.page);

        if (newImgs[0].length < 1) throw new Error();
        if (newImgs[1]) this.setState({ isAll: true });

        this.setState(prevState => {
          return {
            images: prevState.images.concat(newImgs[0]),
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
    const input = e.target.elements[1].value;
    e.target.reset();
    this.setState(prevState => {
      if (prevState.request !== input)
        return { request: input, page: 1, images: [] };
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

        {this.state.modalImg && (
          <Modal img={this.state.modalImg} closeModal={this.closeModal}>
            {<img src={this.state.modalImg} alt="" />}
          </Modal>
        )}

        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} onClick={this.onModal} />
        )}

        {this.state.isLoad && <Loader />}

        {this.state.error && !this.state.isAll && <Error message="Error" />}

        {this.state.isAll && <Error message="Is all" />}

        {this.state.images.length > 0 &&
          !this.state.isLoad &&
          !this.state.error &&
          !this.state.isAll && <Button text="Load more" click={this.onLoad} />}
      </>
    );
  }
}
