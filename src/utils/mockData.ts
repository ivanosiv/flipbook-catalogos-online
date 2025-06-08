
export const createMockCatalogs = () => {
  const mockCatalogs = [
    {
      id: "1",
      title: "Catálogo de Teste",
      description: "Catálogo de demonstração do sistema",
      brand: "teste",
      uploadDate: "2025-06-08T10:00:00.000Z",
      status: "converted",
      slug: "catalogo-de-teste",
      fileSize: "0.6 MB",
      pages: 110,
      fileName: "sample-catalog.pdf",
    },
    {
      id: "2",
      title: "Catálogo Eletrônicos 2025",
      description: "Últimos lançamentos em eletrônicos",
      brand: "TechStore",
      uploadDate: "2025-06-07T15:30:00.000Z",
      status: "converted",
      slug: "catalogo-eletronicos-2025",
      fileSize: "2.1 MB",
      pages: 85,
      fileName: "electronics-catalog.pdf",
    },
    {
      id: "3",
      title: "Moda Verão 2025",
      description: "Coleção completa de verão",
      brand: "FashionPlus",
      uploadDate: "2025-06-06T09:15:00.000Z",
      status: "converted",
      slug: "moda-verao-2025",
      fileSize: "4.3 MB",
      pages: 156,
      fileName: "summer-fashion.pdf",
    }
  ];

  // Salvar no localStorage se não existir
  const existingData = localStorage.getItem('catalogos_data');
  if (!existingData) {
    localStorage.setItem('catalogos_data', JSON.stringify(mockCatalogs));
  }

  return mockCatalogs;
};
