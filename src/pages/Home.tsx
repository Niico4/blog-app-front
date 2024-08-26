import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react';
import { posts, postsImportant } from '../../data/data.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const HomePage = () => {
  return (
    <section className="p-10 overflow-auto h-screen">
      <h2 className="text-white text-3xl mb-5">Publicaciones Destacadas</h2>
      <div className="flex flex-col mb-20 gap-5 justify-evenly">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          className="max-w-full"
        >
          {postsImportant.map(
            ({
              id,
              author,
              date,
              description,
              email,
              imageUrl,
              title,
              url,
            }) => (
              <SwiperSlide key={id}>
                <Card
                  className="max-w-full max-h-[400px] p-5"
                  shadow="sm"
                  key={id}
                >
                  <CardHeader className="justify-between py-0">
                    <div className="flex gap-5">
                      {author ? (
                        <Avatar
                          showFallback
                          isBordered
                          className="text-lg"
                          size="md"
                          name={author[0]}
                        />
                      ) : (
                        <Avatar
                          showFallback
                          isBordered
                          size="md"
                          src="https://images.unsplash.com/broken"
                        />
                      )}
                      <div>
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {author}
                          </h4>
                          <div className="flex justify-center gap-5 items-center">
                            <h5 className="text-xs tracking-tight text-default-400">
                              {email}
                            </h5>
                            <h4 className="text-xs tracking-tight text-default-400">
                              {date}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-3 py-0 mt-3 text-small text-default-400">
                    <h2 className="text-2xl text-gray-200 mb-3">{title}</h2>
                    <p>{description}</p>
                    <img
                      src={imageUrl}
                      alt={`imagen de ${author}`}
                      className="w-[400px] my-3 rounded-md shadow-md shadow-black/60"
                    />
                  </CardBody>
                  <CardFooter className="gap-3">
                    <div className="flex gap-1">
                      <a
                        href={url}
                        className="font-semibold text-default-500 text-small underline hover:text-default-600 transition-all"
                      >
                        Fuente del blog
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            )
          )}
        </Swiper>

        <h2 className="text-white text-3xl my-5">Noticias</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          className="max-w-full"
        >
          {posts.map(
            ({
              id,
              author,
              date,
              description,
              imageUrl,
              title,
              url,
              email,
            }) => (
              <SwiperSlide key={id}>
                <Card className="max-w-[340px] p-4 max-h-[500px]" key={id}>
                  <CardHeader className="justify-between items-center py-0">
                    <div className="flex gap-5">
                      {author ? (
                        <Avatar
                          showFallback
                          isBordered
                          className="text-lg"
                          size="md"
                          name={author[0]}
                        />
                      ) : (
                        <Avatar
                          showFallback
                          isBordered
                          size="md"
                          src="https://images.unsplash.com/broken"
                        />
                      )}
                      <div>
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {author}
                          </h4>
                          <div className="flex justify-center gap-5 items-center">
                            <h5 className="text-xs tracking-tight text-default-400">
                              {email}
                            </h5>
                            <h4 className="text-xs tracking-tight text-default-400">
                              {date}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-3 py-0 mt-3 text-small text-default-400">
                    <h2 className="text-2xl text-gray-200 mb-3">{title}</h2>
                    <p>{description}</p>
                    <img
                      src={imageUrl}
                      alt={`imagen de ${author}`}
                      className="w-[400px] my-3 rounded-md shadow-md shadow-black/60"
                    />
                  </CardBody>
                  <CardFooter className="gap-3">
                    <div className="flex gap-1">
                      <a
                        href={url}
                        className="font-semibold text-default-500 text-small underline hover:text-default-600 transition-all"
                      >
                        Fuente del blog
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default HomePage;
