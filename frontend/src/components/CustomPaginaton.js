import { Pagination } from '@mantine/core';

const CustomPaginaton = ({ setPage, page, total}) =>{
    return (
        <Pagination 
          size="xs"
          radius="md"
          total={total} 
          boundaries={1} 
          initialPage={1}
          onChange={setPage}
          page={page} 
          classNames={{
            // item: 'your-item-class',
            // dots: 'your-dots-class',
            active: 'bg-blue-500',
          }}
          // withEdges
          siblings={1}
          getItemAriaLabel={(page) => {
              switch (page) {
                case 'dots':
                  return 'dots element aria-label';
                case 'prev':
                  return 'previous page button aria-label';
                case 'next':
                  return 'next page button aria-label';
                case 'first':
                  return 'first page button aria-label';
                case 'last':
                  return 'last page button aria-label';
                default:
                  return `${page} item aria-label`;
              }
            }}
        />
    );
};

export default CustomPaginaton;