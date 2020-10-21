import React, { Component } from 'react';
import './index.scss';

interface ISpritesProps {
  sprites: string[];
}
interface ISpritesState {
  carouselIdx: number;
}

export default class Sprites extends Component<ISpritesProps, ISpritesState> {
  constructor(props: ISpritesProps) {
    super(props);
    this.state = {
      carouselIdx: 0,
    };

    this.changeCarouselIdx = this.changeCarouselIdx.bind(this);
  }

  componentDidUpdate(prevProps: ISpritesProps) {
    if (this.props.sprites !== prevProps.sprites) {
      this.setState({ carouselIdx: 0 });
    }
  }

  changeCarouselIdx(change: number) {
    const { carouselIdx } = this.state;
    const { sprites } = this.props;
    this.setState({ carouselIdx: (carouselIdx + change + sprites.length) % sprites.length });
  }

  render() {
    const { sprites } = this.props;
    const { carouselIdx } = this.state;

    return (
      <div className="pokemon-sprites">
        <div className="slideshow-container">
          {/* Full-width images with number and caption text */}
          {sprites.map((value, idx) => (
            <div key={value} className={`img-slide fade ${carouselIdx === idx ? 'img-slide--active' : ''}`}>
              <img src={value} alt="spriteImage" style={{ width: '100%' }} />
            </div>
          ))}
          {/* Next and previous buttons */}
          <a
            href="javascript"
            className="prev"
            onClick={(e) => {
              e.preventDefault();
              this.changeCarouselIdx(-1);
            }}
          >
            ❮
          </a>
          <a
            href="javascript"
            className="next"
            onClick={(e) => {
              e.preventDefault();
              this.changeCarouselIdx(1);
            }}
          >
            ❯
          </a>
        </div>
        <br />
      </div>
    );
  }
}
