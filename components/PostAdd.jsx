import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Container, Form, Input } from "reactstrap"
import dynamic from "next/dynamic";

const JoditEditor = dynamic(
  () => import("jodit-react").then((mod) => mod.default || mod),
  { ssr: false }
);

const PostAdd = () => {
  const [content, setContent] = useState(() => '');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handlePostChange = useCallback((newContent) => {
    setContent(newContent);
  }, []);

  const editorRef = useRef(null);

  return (
    <div className='w-full md:col-span-2 relative lg:h-[85vh] h-[85vh] m-auto p-4 border rounded-lg bg-white'>
      <h1 className='text-2xl'>Add New Post</h1>
      <Form>
        <div className="flex py-4">
          <Input
            className="border border-gray-400 rounded-lg py-2 px-4 w-3/4"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter some text..."
          />
        </div>
        <div className="my-3">
          <React.Suspense fallback={<div>Loading editor...</div>}>
            <JoditEditor
              ref={editorRef}
              value={content}
              onChange={handlePostChange}
              shouldHandleActive={false}
              autoResize={true}
              placeholder="What's On Your Mind..."
            />
          </React.Suspense>
        </div>
        <Container className='text-center'>
          <Button className='bg-blue-500 p-1 rounded'> Create Post </Button>
        </Container>
      </Form>
    </div>
  )
}

export default PostAdd
