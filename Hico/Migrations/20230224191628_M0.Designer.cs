﻿// <auto-generated />
using System;
using Hico.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Hico.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230224191628_M0")]
    partial class M0
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Hico.Database.Models.Material", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("ManufacturerCode")
                        .HasColumnType("int");

                    b.Property<string>("PartNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<int>("UnitOfUsageId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UnitOfUsageId");

                    b.ToTable("Materials");
                });

            modelBuilder.Entity("Hico.Database.Models.Task", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TaskMaterialUsageId")
                        .HasColumnType("int");

                    b.Property<int>("TotalDuration")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TaskMaterialUsageId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("Hico.Database.Models.TaskMaterialUsage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<Guid>("MaterialId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("UnitOfMeasurementId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MaterialId");

                    b.HasIndex("UnitOfMeasurementId");

                    b.ToTable("TaskMaterialUsages");
                });

            modelBuilder.Entity("Hico.Database.Models.Unit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Units");
                });

            modelBuilder.Entity("Hico.Database.Models.Material", b =>
                {
                    b.HasOne("Hico.Database.Models.Unit", "UnitOfUsage")
                        .WithMany()
                        .HasForeignKey("UnitOfUsageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UnitOfUsage");
                });

            modelBuilder.Entity("Hico.Database.Models.Task", b =>
                {
                    b.HasOne("Hico.Database.Models.TaskMaterialUsage", "TaskMaterialUsage")
                        .WithMany()
                        .HasForeignKey("TaskMaterialUsageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TaskMaterialUsage");
                });

            modelBuilder.Entity("Hico.Database.Models.TaskMaterialUsage", b =>
                {
                    b.HasOne("Hico.Database.Models.Material", "Material")
                        .WithMany("TaskMaterialUsages")
                        .HasForeignKey("MaterialId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Hico.Database.Models.Unit", "UnitOfMeasurement")
                        .WithMany()
                        .HasForeignKey("UnitOfMeasurementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Material");

                    b.Navigation("UnitOfMeasurement");
                });

            modelBuilder.Entity("Hico.Database.Models.Material", b =>
                {
                    b.Navigation("TaskMaterialUsages");
                });
#pragma warning restore 612, 618
        }
    }
}
