import Alert from '@/components/common/Alert';
import CardTemplate from '@/components/sections/Blog/CardTemplate';
import { Variant } from '@/constants/variantsAlert';
import useAlert from '@/hooks/useAlert';
import usePosts from '@/hooks/usePosts';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

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
  const { alert, showAlert } = useAlert();
  const [initialValues, setInitialValues] = useState<InitialValues>({
    _id: '',
    title: '',
    description: '',
    author: '',
    createdAt: Date.now(),
    tags: [],
  });

  useEffect(() => {
    if (post && post._id.length > 1) {
      const { _id, createdAt, description, title, author, tags } = post;
      setInitialValues({
        _id: _id,
        title: title,
        description: description,
        author: author,
        createdAt: createdAt,
        tags: tags,
      });
      onOpen();
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, createdAt } = initialValues;
    if ([title, description, createdAt].includes('')) {
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
              <CardTemplate
                key={index}
                _id={_id}
                title={title}
                author={author}
                createdAt={createdAt}
                description={description}
                tags={tags}
                updatePost={() =>
                  updatePost({
                    _id,
                    title,
                    author,
                    createdAt,
                    description,
                    tags,
                  })
                }
                deletePost={() => deletePost(_id)}
              />
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
