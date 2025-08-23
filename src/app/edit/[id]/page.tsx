"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getListaCategoria } from "@/app/services/categoria";
import { getProduto, updateProduto } from "@/app/services/produtos";
import { Categoria, Produto, ProdutoInput } from "@/app/types/produto";

export default function EditProdutoPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const produtoId = params?.id;

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ProdutoInput>({
    name: "",
    description: "",
    material: "",
    productionTime: "",
    price: "",
    photos: [{ title: "", src: "" }],
    categoryId: "",
  });

  // Carrega categorias + produto
  useEffect(() => {
    if (!produtoId) return;

    Promise.all([getListaCategoria(), getProduto(produtoId)])
      .then(([cats, produto]) => {
        setCategorias(cats);
        preencherForm(produto);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        alert("Erro ao carregar informações do produto.");
      })
      .finally(() => setLoading(false));
  }, [produtoId]);

  const preencherForm = (produto: Produto) => {
    setForm({
      name: produto.name,
      description: produto.description,
      material: produto.material,
      productionTime: produto.productionTime,
      price: produto.price.toString(),
      photos: produto.photos.map((f) => ({ title: f.title, src: f.src })),
      categoryId: produto.categoryId,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? value.replace(",", ".") : value,
    }));
  };

  const handlePhotoChange = (index: number, field: "title" | "src", value: string) => {
    const newPhotos = [...form.photos];
    newPhotos[index][field] = value;
    setForm((prev) => ({ ...prev, photos: newPhotos }));
  };

  const addPhoto = () => {
    setForm((prev) => ({
      ...prev,
      photos: [...prev.photos, { title: "", src: "" }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produtoId) return;

    try {
      await updateProduto(produtoId, form);
      router.push("/");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao salvar produto. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <main className="bg-dark min-vh-100 py-5 text-light d-flex justify-content-center align-items-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-dark min-vh-100 py-5 text-light">
      <div className="container">
        <h1 className="h3 fw-bold mb-4">
          <i className="bi bi-pencil-square me-2 text-warning"></i> Editar Produto
        </h1>

        <form
          onSubmit={handleSubmit}
          className="card bg-secondary text-light p-4 rounded-4 shadow-sm"
        >
          {/* Nome */}
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Descrição */}
          <div className="mb-3">
            <label className="form-label">Descrição</label>
            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          {/* Material */}
          <div className="mb-3">
            <label className="form-label">Material</label>
            <input
              type="text"
              className="form-control"
              name="material"
              value={form.material}
              onChange={handleChange}
            />
          </div>

          {/* Tempo de Produção */}
          <div className="mb-3">
            <label className="form-label">Tempo de Produção</label>
            <input
              type="text"
              className="form-control"
              name="productionTime"
              value={form.productionTime}
              onChange={handleChange}
            />
          </div>

          {/* Preço */}
          <div className="mb-3">
            <label className="form-label">Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Categoria */}
          <div className="mb-3">
            <label className="form-label">Categoria</label>
            <select
              className="form-select"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Fotos */}
          <div className="mb-3">
            <label className="form-label">Fotos</label>
            {form.photos.map((photo, i) => (
              <div key={i} className="d-flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Título"
                  className="form-control"
                  value={photo.title}
                  onChange={(e) => handlePhotoChange(i, "title", e.target.value)}
                />
                <input
                  type="url"
                  placeholder="URL da imagem"
                  className="form-control"
                  value={photo.src}
                  onChange={(e) => handlePhotoChange(i, "src", e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-outline-light mt-2"
              onClick={addPhoto}
            >
              <i className="bi bi-plus-circle"></i> Adicionar Foto
            </button>
          </div>

          {/* Botão */}
          <button type="submit" className="btn btn-warning fw-semibold">
            Atualizar Produto
          </button>
        </form>
      </div>
    </main>
  );
}
