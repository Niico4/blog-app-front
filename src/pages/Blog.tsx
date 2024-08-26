import Alert from '@/components/Alert';
import { Variant } from '@/constants/variantsAlert';
import useAlert from '@/hooks/useAlert';
import usePosts from '@/hooks/usePosts';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { Fragment, useEffect, useState } from 'react';

interface InitialValues {
  _id: string;
  title: string;
  author?: string;
  description: string;
  createdAt: number;
  tags?: string[] | null;
}

const BlogPage = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { posts, post, savePost, updatePost, deletePost } = usePosts();
  const [initialValues, setInitialValues] = useState<InitialValues>({
    _id: '',
    title: '',
    description: '',
    author: '',
    createdAt: Date.now(),
    tags: [],
  });
  const { alert, showAlert } = useAlert();

  const formatDate = (date: Date | number) => {
    const dateFormat = new Date(date);

    return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(
      dateFormat
    );
  };

  useEffect(() => {
    if (post && post._id.length > 1) {
      setInitialValues({
        _id: post._id,
        title: post.title,
        description: post.description,
        author: post.author,
        createdAt: post.createdAt,
        tags: post.tags,
      });
      onOpen();
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      [
        initialValues.title,
        initialValues.description,
        initialValues.createdAt,
      ].includes('')
    ) {
      showAlert('Todos los campos son obligatorios', true);
      return;
    }

    showAlert('Guardado Correctamente', false);

    savePost(initialValues);
    setInitialValues({
      _id: '',
      title: '',
      description: '',
      author: '',
      createdAt: Date.now(),
      tags: [],
    });
    onClose();
  };


  return (
    <section className="p-10 overflow-auto h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl mb-5">Tu Blog</h1>
        <Button size="md" variant="faded" onPress={onOpen}>
          Crea una nueva Publicación
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        backdrop="opaque"
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crea tu Publicación
            </ModalHeader>
            <ModalBody>
              {alert.message && (
                <div className="my-2">
                  <Alert
                    message={alert.message}
                    variant={alert.error ? Variant.ERROR : Variant.SUCCESS}
                  />
                </div>
              )}
              <form
                className="flex flex-col gap-3 mt-5 items-end"
                onSubmit={handleSubmit}
              >
                <Input
                  type="text"
                  label="Titulo"
                  color="default"
                  variant="flat"
                  isRequired
                  value={initialValues.title}
                  onChange={(e) =>
                    setInitialValues({
                      ...initialValues,
                      title: e.target.value,
                    })
                  }
                />
                <Input
                  type="text"
                  label="Descripción"
                  color="default"
                  variant="flat"
                  isRequired
                  value={initialValues.description}
                  onChange={(e) =>
                    setInitialValues({
                      ...initialValues,
                      description: e.target.value,
                    })
                  }
                />
                <Input
                  type="date"
                  label="Fecha de creación"
                  color="default"
                  variant="flat"
                  isRequired
                  value={
                    new Date(initialValues.createdAt)
                      .toISOString()
                      .split('T')[0]
                  }
                  onChange={(e) => {
                    const dateValue = new Date(e.target.value).getTime();
                    setInitialValues((prev) => ({
                      ...prev,
                      createdAt: dateValue,
                    }));
                  }}
                />
                <Input
                  type="text"
                  label="Tags"
                  color="default"
                  variant="flat"
                  value={initialValues.tags?.join(', ') || ''}
                  onChange={(e) => {
                    setInitialValues((prev) => ({
                      ...prev,
                      tags:
                        e.target.value.split(',').map((tag) => tag.trim()) ||
                        [],
                    }));
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  className="bg-custom-gradient-purple font-bold text-white tracking-wider my-2"
                  onPress={onClose}
                >
                  {initialValues._id ? 'Guardar Cambios' : 'Crear'}
                </Button>
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>

      {posts.length ? (
        <div className="flex flex-wrap justify-center gap-10 w-4/5 mx-auto my-10">
          {posts.map(
            ({ _id, title, author, createdAt, description, tags }, index) => (
              <Card className="max-w-[400px] p-4 max-h-[500px]" key={index}>
                <CardHeader className="justify-between items-center py-0">
                  <div className="flex gap-5">
                    <Avatar
                      showFallback
                      isBordered
                      size="md"
                      src="https://images.unsplash.com/broken"
                    />
                    <div>
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {author}
                        </h4>
                        <div className="flex justify-center gap-5 items-center">
                          <h5 className="text-xs tracking-tight text-default-400">
                            {formatDate(createdAt)}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="px-3 py-0 mt-3 text-small text-default-400">
                  <h2 className="text-2xl text-gray-200 mb-3">{title}</h2>
                  <p>{description}</p>
                </CardBody>
                <CardFooter className="gap-3">
                  <div>
                    <div className="flex items-center gap-1">
                      {tags?.map((tag, index) => (
                        <Fragment key={index}>
                          <span className="font-semibold text-default-500 text-small underline hover:text-default-600 transition-all">
                            {tag}
                          </span>
                          {index < tags.length - 1 && ' - '}
                        </Fragment>
                      ))}
                    </div>

                    <div className="flex gap-5 items-center mt-10">
                      <Button
                        variant="faded"
                        color="danger"
                        size="sm"
                        onClick={() => deletePost(_id)}
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="faded"
                        color="warning"
                        size="sm"
                        onClick={() =>
                          updatePost({
                            _id,
                            title,
                            author,
                            createdAt,
                            description,
                            tags,
                          })
                        }
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      ) : (
        <h2 className="font-black text-2xl text-center">
          No hay Publicaciones
        </h2>
      )}
    </section>
  );
};

export default BlogPage;
