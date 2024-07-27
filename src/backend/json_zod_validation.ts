import { z } from 'zod';

// Define the ticket schema
const ticketSchema = z.object({
  order_id: z.string(),
  status: z.enum(['new', 'update']),
  operation: z.enum(['sale', 'refund', 'cancel']),
  company_id: z.string().uuid(),
  event_id: z.string().uuid(),
  user: z.object({
    email: z.string().email(),
    phone: z.string().regex(/^\d+$/),
  }),
  sale: z.array(z.object({
    ticket: z.object({
      ticket_id: z.string(),
      ticket_status: z.enum(['active', 'inactive']),
      ticket_section: z.string(),
      ticket_row: z.string(),
      ticket_seat: z.string(),
      ticket_description: z.string().nullable().optional(),
      ticket_qty: z.number().int().min(1),
      ticket_price: z.number().multipleOf(0.01),
      fees: z.array(z.object({
        fee_id: z.string(),
        fee_description: z.string(),
        fee_amount: z.number().multipleOf(0.01),
        taxes: z.object({
          tax_id: z.string(),
          tax_description: z.string(),
          tax_amount: z.number().multipleOf(0.01),
        }),
      })),
      ticket_total: z.number().multipleOf(0.01),
    }),
  })),
});

// Infer the TypeScript type from the schema
type Ticket = z.infer<typeof ticketSchema>;

// Function to validate ticket data
const validateTicket = (data: unknown): z.SafeParseReturnType<unknown, Ticket> => {
  return ticketSchema.safeParse(data);
};

// Export the schema, type, and validation function
export { ticketSchema, Ticket, validateTicket };