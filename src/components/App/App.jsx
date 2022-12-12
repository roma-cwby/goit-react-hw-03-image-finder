import { Component } from 'react';
import { fetchImg } from 'api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    request: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.request !== this.state.request ||
      prevState.page !== this.state.page
    ) {
      const newImgs = await fetchImg(this.state.request, this.state.page);
      this.setState(prevState => {
        return {
          images: prevState.images.concat(newImgs),
        };
      });
    }
  }

  onRequest = e => {
    e.preventDefault();
    this.setState(prevState => {
      if (prevState.request !== e.target.elements[1].value)
        return { request: e.target.elements[1].value, page: 1, images: [] };
    });
  };

  onLoad = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onRequest} />

        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} />
        )}
        {this.state.images.length > 0 && (
          <Button text="Load more" click={this.onLoad} />
        )}
      </>
    );
  }
}
