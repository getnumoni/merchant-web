# Numoni Web V2 - Project Documentation

## Overview

A comprehensive Next.js application with multi-step branch registration, interactive Google Maps integration, and modern UI components.

## 🏗️ Architecture

### Tech Stack

-  **Framework**: Next.js 14 (App Router)
-  **Styling**: Tailwind CSS
-  **UI Components**: Radix UI + Shadcn UI
-  **State Management**: Zustand
-  **Form Management**: React Hook Form + Zod
-  **Maps**: Google Maps Platform
-  **Icons**: Lucide React + Custom SVGs

## 📁 Project Structure

```
├── app/
│   ├── api/                    # Backend API routes
│   │   ├── maps/script/        # Google Maps script loader
│   │   └── places/             # Places API proxy
│   ├── dashboard/              # Dashboard page
│   └── layout.tsx              # Root layout
├── components/
│   ├── common/                 # Shared components
│   │   ├── navbar.tsx          # Navigation bar
│   │   └── sidebar.tsx         # Sidebar navigation
│   ├── ui/                     # Reusable UI components
│   │   ├── form-*.tsx          # Form components
│   │   ├── google-map.tsx      # Interactive map
│   │   └── places-search.tsx   # Address search
│   └── branch-level/           # Branch registration
│       ├── add-branch.tsx      # Main dialog
│       └── steps/              # Multi-step form
├── lib/
│   ├── schemas/                # Zod validation schemas
│   └── helper.ts               # Utility functions
├── stores/                     # Zustand stores
└── data/                       # Static data (Nigeria states/LGAs)
```

## 🚀 Key Features

### 1. Multi-Step Branch Registration Form

**Location**: `components/branch-level/add-branch.tsx`

A 5-step form with validation and state management:

```typescript
// Step progression with validation
const handleNext = async () => {
   const getStepFields = () => {
      switch (currentStep) {
         case 1:
            return [
               "branchName",
               "branchRegion",
               "lga",
               "description",
               "phone",
               "email",
            ];
         case 2:
            return []; // Map step - no validation
         case 3:
            return []; // Social media - optional
         case 4:
            return ["managerName", "managerPhone", "managerEmail"];
         case 5:
            return ["bank", "accountNumber", "minPayment"];
      }
   };

   const isValid = await form.trigger(fieldsToValidate);
   if (isValid) nextStep();
};
```

**Steps**:

1. **Branch Info**: Name, region, LGA, description, contact info, logo, business photo
2. **Location**: Interactive map with address search
3. **Social Media**: Optional social media links
4. **Manager**: Manager details and photo
5. **Collection Account**: Bank details and minimum payment

### 2. Interactive Google Maps Integration

**Location**: `components/ui/google-map.tsx`

Real-time map with location selection:

```typescript
// Secure API key handling via backend
const loadGoogleMaps = async () => {
   const response = await fetch("/api/maps/script");
   const data = await response.json();

   const script = document.createElement("script");
   script.src = data.scriptUrl; // API key hidden from client
   document.head.appendChild(script);
};

// Current location with permission handling
const useCurrentLocation = () => {
   navigator.geolocation.getCurrentPosition(
      (position) => {
         const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
         };
         // Update map and form fields
      },
      (error) => {
         // Handle permission denied, timeout, etc.
      }
   );
};
```

**Features**:

-  Secure API key management (server-side)
-  Interactive map with draggable markers
-  Address search with autocomplete
-  Current location detection
-  Form field auto-population

### 3. Places Search with Debouncing

**Location**: `components/ui/places-search.tsx`

Optimized address search:

```typescript
// Custom hook with debouncing
const usePlacesSearch = () => {
   const searchPlaces = useCallback((input: string) => {
      if (debounceTimeoutRef.current) {
         clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(async () => {
         if (input.length > 2) {
            const response = await fetch(
               `/api/places/autocomplete?input=${encodeURIComponent(input)}`
            );
            const data = await response.json();
            setPredictions(data.predictions || []);
         }
      }, 500); // 500ms debounce
   }, []);
};
```

### 4. Reusable Form Components

**Location**: `components/ui/form-*.tsx`

Consistent form inputs with validation:

```typescript
// FormInputTopLabel component
export function FormInputTopLabel({
   control,
   name,
   label,
   placeholder,
   required,
   type = "text",
}) {
   return (
      <FormField
         control={control}
         name={name}
         render={({ field, fieldState }) => (
            <FormItem>
               <FormLabel className="text-[#838383]">
                  {label} {required && <span className="text-red-500">*</span>}
               </FormLabel>
               <FormControl>
                  <Input
                     {...field}
                     type={type}
                     placeholder={placeholder}
                     className="border-gray-200 focus:ring-theme-green"
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}
```

**Components**:

-  `FormInputTopLabel`: Text inputs with labels
-  `FormSelectTopLabel`: Dropdown selects
-  `FormTextareaTopLabel`: Multi-line text
-  `FormPhoneInput`: Phone number with country code
-  `FormImageUpload`: Image upload with preview
-  `FormLogoUpload`: Circular logo upload

### 5. State Management with Zustand

**Location**: `stores/branch-store.ts`

Global state for form data and navigation:

```typescript
interface BranchStore {
   currentStep: number;
   formData: Partial<BranchFormData>;
   isOpen: boolean;

   // Actions
   setCurrentStep: (step: number) => void;
   nextStep: () => void;
   prevStep: () => void;
   updateFormData: (data: Partial<BranchFormData>) => void;
   setLogo: (logo: File | null) => void;
   setBusinessPhoto: (photo: File | null) => void;
   setManagerPhoto: (photo: File | null) => void;
   openDialog: () => void;
   closeDialog: () => void;
   resetForm: () => void;
   submitForm: (data: BranchFormData) => void;
}
```

### 6. Form Validation with Zod

**Location**: `lib/schemas/branch-schema.ts`

Comprehensive validation schema:

```typescript
export const branchFormSchema = z.object({
   // Step 1: Branch Info
   logo: z.instanceof(File).optional(),
   branchName: z.string().min(1, "Branch name is required"),
   branchRegion: z.string().min(1, "Branch region is required"),
   lga: z.string().min(1, "LGA is required"),
   description: z.string().min(1, "Branch description is required"),
   phone: z.string().min(1, "Phone number is required"),
   email: z.string().email("Invalid email address"),
   businessPhoto: z.instanceof(File).optional(),

   // Step 2: Location
   address: z.string().min(1, "Address is required"),
   city: z.string().min(1, "City is required"),
   state: z.string().min(1, "State is required"),
   zipCode: z.string().min(1, "ZIP code is required"),

   // Step 3: Manager
   managerPhoto: z.instanceof(File).optional(),
   managerName: z.string().min(1, "Manager name is required"),
   managerPhone: z.string().min(1, "Manager phone is required"),
   managerEmail: z.string().email("Invalid manager email address"),

   // Step 4: Social Media (all optional)
   website: z.string().url("Invalid website URL").optional().or(z.literal("")),
   whatsapp: z.string().optional(),
   linkedin: z
      .string()
      .url("Invalid LinkedIn URL")
      .optional()
      .or(z.literal("")),
   instagram: z
      .string()
      .url("Invalid Instagram URL")
      .optional()
      .or(z.literal("")),
   twitter: z.string().url("Invalid Twitter URL").optional().or(z.literal("")),
   snapchat: z
      .string()
      .url("Invalid Snapchat URL")
      .optional()
      .or(z.literal("")),

   // Step 5: Collection Account
   bank: z.string().min(1, "Bank is required"),
   accountNumber: z
      .string()
      .min(10, "Account number must be at least 10 digits"),
   minPayment: z.string().min(1, "Minimum payment amount is required"),
});
```

## 🔧 Backend API Routes

### Google Maps Script Loader

**Location**: `app/api/maps/script/route.ts`

```typescript
export async function GET() {
   const apiKey = process.env.GOOGLE_MAPS_API_KEY;

   if (!apiKey) {
      return NextResponse.json(
         { error: "Google Maps API key not configured" },
         { status: 500 }
      );
   }

   const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initMap`;

   return NextResponse.json({ scriptUrl });
}
```

### Places Autocomplete

**Location**: `app/api/places/autocomplete/route.ts`

```typescript
export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const input = searchParams.get("input");

   const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}&components=country:ng`
   );

   const data = await response.json();
   return NextResponse.json(data);
}
```

## 🎨 UI/UX Features

### Responsive Design

-  Mobile-first approach
-  Fixed sidebar and navbar
-  Scrollable content areas
-  Touch-friendly interactions

### Smart Form Logic

-  Dynamic LGA loading based on state selection
-  Time validation (closing time must be after opening time)
-  Real-time form validation
-  Step-specific field validation

### Image Handling

-  Drag & drop upload
-  Image preview with delete option
-  File type validation
-  Optimized file handling

## 🚀 Usage Examples

### Opening the Branch Registration Dialog

```typescript
import { useBranchStore } from "@/stores/branch-store";

function MyComponent() {
   const { openDialog } = useBranchStore();

   return <button onClick={openDialog}>Add Branch</button>;
}
```

### Accessing Form Data

```typescript
const { formData, currentStep, nextStep, prevStep } = useBranchStore();

// Get current form data
console.log(formData);

// Navigate steps
nextStep(); // Go to next step
prevStep(); // Go to previous step
```

### Custom Form Component

```typescript
import { FormInputTopLabel } from "@/components/ui/form-input";

function MyForm() {
   const form = useForm<MyFormData>({
      resolver: zodResolver(mySchema),
   });

   return (
      <Form {...form}>
         <FormInputTopLabel
            control={form.control}
            name="fieldName"
            label="Field Label"
            placeholder="Enter value"
            required
         />
      </Form>
   );
}
```

## 🔐 Environment Setup

### Required Environment Variables

```bash
# .env.local
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Google APIs Required

-  Maps JavaScript API
-  Places API
-  Geocoding API

## 📦 Installation & Setup

```bash
# Install dependencies
pnpm install

# Install Google Maps packages
pnpm add @googlemaps/js-api-loader @types/google.maps

# Set up environment variables
cp .env.example .env.local
# Add your Google Maps API key

# Run development server
pnpm dev
```

## 🎯 Key Benefits

1. **Security**: API keys kept server-side
2. **Performance**: Debounced API calls, optimized rendering
3. **User Experience**: Smooth multi-step flow, real-time validation
4. **Maintainability**: Reusable components, clear separation of concerns
5. **Scalability**: Modular architecture, easy to extend

## 🔄 Data Flow

1. User opens branch registration dialog
2. Fills out multi-step form with validation
3. Location selection updates form fields automatically
4. Images are stored in Zustand state
5. Final submission merges form data with stored images
6. Complete payload logged to console for debugging

This architecture provides a robust, scalable foundation for branch management with excellent user experience and developer maintainability.
