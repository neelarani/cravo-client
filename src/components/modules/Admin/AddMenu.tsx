'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { menuApi } from '@/redux';

// Zod schema
const menuSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  price: z.string('price is required'),
  img: z.any().refine(files => files?.length > 0, 'Image is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
});

type MenuFormValues = z.infer<typeof menuSchema>;

const AddMenu = () => {
  const [createMenu, { isLoading }] = menuApi.useCreateMenuMutation();

  const form = useForm<MenuFormValues>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: '',
      title: '',
      price: '',
      img: '',
      description: '',
      category: '',
    },
  });

  const onSubmit = async (values: MenuFormValues) => {
    const data = new FormData();

    // Other fields as JSON
    data.append(
      'data',
      JSON.stringify({
        name: values.name,
        title: values.title,
        price: values.price,
        description: values.description,
        category: values.category,
      })
    );
    data.append('file', values.img[0]);

    try {
      const res = await createMenu(data).unwrap();
      console.log(res);
      if (res.success) {
        form.reset();
        toast.success(res.message || 'Menu created successfully!');
      } else {
        toast.error(res.message || 'Failed to create menu');
      }
    } catch (err) {
      console.error('Create Menu Error:', err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <Card className=" max-w-6xl mx-auto p-16 bg-card text-card-foreground border border-border shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">
          Add New Menu
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter menu name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter menu title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={e => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-4 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Add Menu'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddMenu;
