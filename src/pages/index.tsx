import { GetStaticPropsResult } from "next";

interface Person {
  _uid: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

interface Product {
  _uid: string;
  name: string;
  stock: number;
  price: number;
}

interface HomeProps {
  people: Person[];
  products: Product[];
}

export default function Home(props: HomeProps) {
  const { people, products } = props;
  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <main className="grid grid-cols-3 mb-4 gap-4">
        <h1 className="col-span-3 text-2xl font-bold">People</h1>
        {people?.map(person => (
          <article key={person._uid} className="p-4 border border-gray-300 rounded">
            <p className="text-xl">{person.first_name} {person.last_name}</p>
            <p>Email: {person.email}</p>
            <p>Birthday: {person.date_of_birth}</p>
          </article>
        ))}
      </main>
      <section className="grid grid-cols-3 gap-4">
        <h1 className="col-span-3 text-2xl font-bold">Products</h1>
        {products?.map(product => (
          <article key={product._uid} className="p-4 border border-gray-300 rounded">
            <p className="text-xl">{product.name}</p>
            <p>Stock: {product.stock}</p>
            <p>Price: {product.price}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
  const res = await fetch(process.env.CONTENT_URL as string);
  const json = await res.json();
  const props = {
    people: json.story.content.main,
    products: json.story.content.products,
  };
  return {
    props,
    revalidate: 60,
  }
}
