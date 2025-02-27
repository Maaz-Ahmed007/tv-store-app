Project TV Store

First tackle database models for each like customers, sales, expenses and products. Then create validations schema using zod and create server actions to do all kinds of actions we will need even the updating of stock and sales to make sure all needed functionality is added and at last we will tackle the front end of the website to make it look as we want to and add some sort of authentication with no registeration and forget password functionality as well as settings where user can edit few things.

TODO - Server Actions + client & server side error handling

> > Products:
> > -> Creates product correctly and responds to error handling correctly. ✅
> > -> Deletes product correctly but no error handling. ✅
> > -> Fetches products correctly with proper types. ✅
> > -> Updates product correctly and responds to error handling correctly.
> > -> Updates product quantity correctly.
> > -> Updates product sold when sale of same product is made.

> > Customers:
> > -> Creates custemr correctly and responds to error handling correctly.
> > -> Deletes custemr correctly but no error handling.
> > -> Fetches custemrs correctly with proper types.
> > -> Updates custemr correctly and responds to error handling correctly.

> > Sales:
> > -> Creates sale correctly for the selected customer and gets products correctly as well as updating products sold and quantity and responds to error handling correctly.
> > -> Deletes sale.
> > -> Fetches sales.
> > -> Updates sale.

Things to change and add >>

Total Components we will be adding for sales page:
AddCustomer - To create customer (OverlayPage)
AddSales - To create sales for customer (OverlayPage)
AddPayments - To create payments for customer (OverlayPage)
OverlayPage - For all overlay pages
RefreshButton - To refresh the selected page
SearchCustomer - searchbar component that searches for customer by name
CustomerList - Table to get customers and their balance in table in sales page
CustomerPage - To manage customer details (OverlayPage)
CustomerSalesPage - To manage sales, payments and customer balance (OverlayPage)
CustomerSalesList - Table to display sales and payments in CustomerSalesPage
SaleDetail - To manage individual sale (OverlayPage)
PaymentDetail - To manage individual payment (OverlayPage)

TODO: Sales and products page should load faster when switching between two

schema.prisma
TODO: Finish and complete schema.prisma ✅

validations.ts
TODO: Create proper types for getCustomerSchema and complete other types and schemas ✅

calculations.ts
TODO: ✅

sales page.tsx
Sales page is a component that keeps record of customers and sales they have made, In here user will create sales only for the available products and we will also need to take payment from customers for the product they have bought from user.
TODO: Properly implement and finish the sales page and keep it server component

CustomerList.tsx
TODO: Only display names and fetch and calculate final balance of each customer
TODO: We don't need heading in customer list
TODO: Style the table to look more better and mobile styled
TODO: Add search bar for customer names
TODO: Sorting panel for customer list

SalesPageContent.tsx
TODO: Properly give functionality to refresh page
TODO: We need to properly style balance boxes

CustomerSales.tsx
TODO: We need a proper and correct way to calculate final balance without any errors
TODO: For empty row we won't use "-" but leave it empty
TODO: We don't need type column
TODO: Same styled used for balance box we will display balance here without the sorting functionality
TODO: We will add PDF that will collect and download all the data for a customer
TODO: We will add a whatsapp sharing button that will take number from customer and directly send data to that whatsapp contact
TODO: We will display date column, details, balance, debit and then credit column in order
TODO: Make sure correct types are fetched and correct data is displayed
TODO: Add cursor pointer to each entry and when clicked individual transaction overlay page should open
TODO: Create transaction overlay page
TODO: Use this date format for all website: {format( new Date(item.createdAt), "dd/MM/yyyy" )}
TODO: Add sale will open AddSale Overlay page.
TODO: Add Credit will open AddTransaction Overlay page.
TODO: Add Debit will open AddTransaction Overlay page.


I have created a finance and inventory management system website for a store in next js, using prisma ORM, zod validations and server actions. I am using latest version of next js.

I have created two pages so far, products page and sales page as default page. This website will serve as a mobile app for client who are using it on mobile devices.

Most of products page is good, correctly implemented and functional, but sales page is not ready yet and there are some components I want to make sure it is using in right places.

calculations.ts, these are the calculations for customers, sales and payments:

customers.ts this is the server actions for customers:

products.ts server actions for products:

RefreshButton.tsx is a page refreshing button component that on clicks should properly refresh the page and if data is not correctly fetch from database it should come handy in refreshing and making sure the selected page is working and running correctly with all the data fetched:

OverlayPage.tsx is a component that we will use for mobile devices, where when user want to create or update a customer, sales, transaction, product or anything instead of separate page opening on different url, overlay page will open on the same url where we will manage most of the functionality:

DashboardWrapper.tsx and BottomNav.tsx are the components we are using to display the mobile menu, this is the not the final version that will be used in the production version but for now this is the placeholder:

lastly AddCustomerButton.tsx component is a component that is used to open the customer form where we creates customers, but I want to this code to create a component that is also for updating customer, creating and updating sales, payments, products and everything related that needs a page bottom button for opening an overlay page.
